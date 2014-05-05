$(document).ready(function() {

	Blockly.inject(document.getElementById('blockly'),
			{path: './', toolbox: document.getElementById('toolbox')});

	/**
	 * Bind an event to a function call.
	 * @param {!Element} element Element upon which to listen.
	 * @param {string} name Event name to listen to (e.g. 'mousedown').
	 * @param {!Function} func Function to call when event is triggered.
	 *     W3 browsers will call the function with the event object as a parameter,
	 *     MSIE will not.
	 */
	function bindEvent(element, name, func) {
		if (element.addEventListener) {  // W3C
			element.addEventListener(name, func, false);
		} else if (element.attachEvent) {  // IE
			element.attachEvent('on' + name, func);
		}
	}

	/**
	 * Backup code blocks to localStorage.
	 */
	function backup_blocks() {
		console.log('backup');
		if ('localStorage' in window) {
			var xml = Blockly.Xml.workspaceToDom(Blockly.mainWorkspace);
			window.localStorage.setItem('arenomat', Blockly.Xml.domToText(xml));
		}
	}

	/**
	 * Restore code blocks from localStorage.
	 */
	function restore_blocks() {
		if ('localStorage' in window && window.localStorage.arenomat) {
			var xml = Blockly.Xml.textToDom(window.localStorage.arenomat);
			Blockly.Xml.domToWorkspace(Blockly.mainWorkspace, xml);
		}
	}

	function auto_save_and_restore_blocks() {
		// Restore saved blocks in a separate thread so that subsequent
		// initialization is not affected from a failed load.
		window.setTimeout(restore_blocks, 0);
		// Hook a save function onto unload.
		bindEvent(window, 'unload', backup_blocks);
	}

	/**
	 * Save blocks to local file
	 */
	function codeExport() {
		var xml = Blockly.Xml.workspaceToDom(Blockly.mainWorkspace);
		var data = Blockly.Xml.domToText(xml);

		// Store data in blob.
		var builder = new BlobBuilder;
		builder.append(data);
		saveAs(builder.getBlob("text/plain;charset=utf-8"), "block.xml");
	}

	/**
	 * Load blocks from local file
	 *
	 */
	function codeImport(event) {
		if (!event)
			return;

		var files = event.target.files;

		// Only allow uploading one file.
		if (files.length !== 1)
			return;

		// FileReader
		var reader = new FileReader();
		reader.onloadend = function(event) {
			var target = event.target;
			// 2 === FileReader.DONE
			if (target.readyState === 2) {
				if (confirm("Want to clean current blocks? Press 'Cancel' will load blocks into current workspace.")) {
					Blockly.mainWorkspace.clear();
				}
				var xml = Blockly.Xml.textToDom(target.result);
				Blockly.Xml.domToWorkspace(Blockly.mainWorkspace, xml);
			}
			// Reset value of input after loading
			// because Chrome will not fire a 'change' event
			// if the same file is loaded again.
			loadInput.value = '';
		};
		reader.readAsText(files[0]);
	}

	function codeClear() {
		var count = Blockly.mainWorkspace.getAllBlocks().length;
		if ((count > 2) || window.confirm('Are you sure?')) {
			Blockly.mainWorkspace.clear();
		}
	}


	auto_save_and_restore_blocks();

	// init load event
	// fake input file
	// TODO: jquery style
	var loadInput = document.getElementById('import');
	loadInput.addEventListener('change', codeImport, false);
	document.getElementById('codeImport').onclick = function() {
		loadInput.click();
	}

	$("#codeStart").click(function() {
		var code = Blockly.Generator.workspaceToCode('JavaScript');
		socket.emit('codeStart', code);
	});
	
	$("#codeExport").click(function() {
		codeExport();
	});

	$("#codeImport").click(function() {
		codeImport();
	});
	$("#codeClear").click(function() {
		codeClear();
	});

	$("#codeStop, #elapsedTime").click(function() {
		socket.emit('codeStop');
	});

});
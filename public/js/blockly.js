$(document).ready(function() {
  Blockly.FieldColour.colors = [
    "#000000", "#3B3131", "#463E3F", "#504A4B", "#5C5858", "#666362",
    "#F9B7FF", "#E3E4FA", "#FFFFFF"];
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
      console.log(xml);
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


  function codeSave() {
    var xml = Blockly.Xml.workspaceToDom(Blockly.mainWorkspace);
    var name = $(xml).find('value[name="name"]')[0].innerText;
    var textxml = Blockly.Xml.domToText(xml);
    var code = Blockly.Generator.workspaceToCode('JavaScript');
    var zones = [];

    if (window.localStorage && window.localStorage.zones) zones = JSON.parse(window.localStorage.zones);

    var data = {name: name, xml: textxml, code: code, zones: zones};
console.log(data);

    $.post("/experiments", data)
       .done(function (data) {
         alert(name + ' has been sucessfully saved.');
       });
  }

  var loadInput = $('#import');
  loadInput.on('change', codeImport, false);
  $('#codeImport').click(function() {
    loadInput.click();
  });


  $("#codeExport").click(function(e) {
    e.preventDefault();
    codeExport();
  });
  $("#codeSave").click(function(e) {
    e.preventDefault();
    codeSave();
  });

  $("#codeImport").click(function(e) {
    e.preventDefault();
    codeImport();
  });
  $("#codeClear").click(function(e) {
    e.preventDefault();
    codeClear();
  });

  $(".codeStart").click(function(e) {
    cam_counter = 0;
    cv_counter = 0;
    done = false;

    e.preventDefault();

    var xml = Blockly.Xml.workspaceToDom(Blockly.mainWorkspace);

    var name = '';
    var names = $(xml).find('value[name="name"]');
    if (names.length)
      name = names[0].innerText || '';

    if (!name) {
      alert('No session name, aborting');
    } else {
      var textxml = Blockly.Xml.domToText(xml);


    var day = '';
    var days = $(xml).find('value[name="day"]');
    if (days.length)
      day = days[0].innerText || '';

    var person = '';
    var persons = $(xml).find('value[name="person"]');
    if (persons.length)
      person = persons[0].innerText || '';

    var subject = '';
    var subjects = $(xml).find('value[name="subject"]');
    if (subjects.length)
      subject = subjects[0].innerText || '';

      var code = Blockly.Generator.workspaceToCode('JavaScript');

      $(".codeStart").attr('disabled', true);
      $(".codeStop").attr('disabled', false);
    $("#elapsedTime").css('background', 'green').css('color', 'white');
var data = {name: name, person: person, subject: subject, day: day, xml: textxml, code: code};
console.log(data);
      socket.emit('codeStart', data);
    }
  });

  $(".codeStop").click(function(e) {
    e.preventDefault();
    $(".codeStop").attr('disabled', true);
    $(".codeStart").attr('disabled', false);
    $("#elapsedTime").css('background', '').css('color', 'black');
    socket.emit('codeStop');
  });

});
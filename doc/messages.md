Messages emited via websockets
---------------

**Frame message**
Is beeing emited each time frame / correct webcam frame snap. Field *tracked* validates the OpenCV output. When *tracked* is **false** the frame is not considered as valid. Objects were not tracked, so actions are not valid. The only valid field therefore is webcam.

	frame = {
		session_id: "34093mdfsfd098u0d9smew",
		tracked: true,
		cv: {
			rat: {
				position: {x: 100, y: 200},
				zones: [ true, false, false, true ]
			},
			robot: {
				position: {x: 200, y: 200},
				zones: [ false, false, false, true ]
			}
		},
		output: [ 'shocking', 'feeding', 'fucking' ],
		webcam: 'dpsoadposdpmwdq',
		timestamp: 1241445425
	}
	
	experiment = {
		name: "experiment",
		timestamp: 6856561681,
		day: 10,
		code: "js code",
		xml: "xml file",
		zones: [
			{ 
				id: 1, 
				name: "dangerous", 
				dynamic: true,
				polygon: [ { x: 1, y: 1 }, { x: 1, y: 1 }, { x: 1, y: 1 }, { x: 1, y: 1 } ] 
			},
			{ 
				id: 2, 
				name: "safe", 
				dynamic: true,
				polygon: [ { x: 1, y: 1 }, { x: 1, y: 1 }, { x: 1, y: 1 }, { x: 1, y: 1 } ] 
			}
		]		
	}
	
	template = {
		name: "experiment",
		code: "js code",
		xml: "xml file",
		zones: [
			{ 
				id: 1, 
				name: "dangerous", 
				dynamic: true,
				polygon: [ { x: 1, y: 1 }, { x: 1, y: 1 }, { x: 1, y: 1 }, { x: 1, y: 1 } ] 
			},
			{ 
				id: 2, 
				name: "safe", 
				dynamic: true,
				polygon: [ { x: 1, y: 1 }, { x: 1, y: 1 }, { x: 1, y: 1 }, { x: 1, y: 1 } ] 
			}
		]
	}

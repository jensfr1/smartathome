[
    {
        "id": "824d98a0.0a27d8",
        "type": "ioBroker in",
        "z": "712fca3d.852e64",
        "name": "First button pressed",
        "topic": "mihome.0.devices.86sw2_158d0001f40daf.channel_0",
        "payloadType": "value",
        "onlyack": "",
        "func": "all",
        "gap": "",
        "x": 210,
        "y": 40,
        "wires": [
            [
                "3f5ff0c4.5757c"
            ]
        ]
    },
    {
        "id": "3f5ff0c4.5757c",
        "type": "switch",
        "z": "712fca3d.852e64",
        "name": "",
        "property": "payload",
        "propertyType": "msg",
        "rules": [
            {
                "t": "eq",
                "v": "true",
                "vt": "str"
            },
            {
                "t": "else"
            }
        ],
        "checkall": "true",
        "repair": false,
        "outputs": 2,
        "x": 410,
        "y": 40,
        "wires": [
            [
                "78b76d0a.8d2144"
            ],
            []
        ]
    },
    {
        "id": "78b76d0a.8d2144",
        "type": "change",
        "z": "712fca3d.852e64",
        "name": "",
        "rules": [
            {
                "t": "set",
                "p": "payload",
                "pt": "msg",
                "to": "true",
                "tot": "bool"
            }
        ],
        "action": "",
        "property": "",
        "from": "",
        "to": "",
        "reg": false,
        "x": 590,
        "y": 40,
        "wires": [
            [
                "e7656ce3.5df81"
            ]
        ]
    },
    {
        "id": "e7656ce3.5df81",
        "type": "knxEasy-out",
        "z": "712fca3d.852e64",
        "server": "694306d4.2fb7f8",
        "topic": "1/0/0",
        "dpt": "1.001",
        "name": "",
        "outputtype": "write",
        "x": 820,
        "y": 40,
        "wires": []
    },
    {
        "id": "d0cc9fe0.eb27b",
        "type": "ioBroker in",
        "z": "712fca3d.852e64",
        "name": "Second button pressed",
        "topic": "mihome.0.devices.86sw2_158d0001f40daf.channel_1",
        "payloadType": "value",
        "onlyack": "",
        "func": "all",
        "gap": "",
        "x": 210,
        "y": 180,
        "wires": [
            [
                "9896a715.0e7a18"
            ]
        ]
    },
    {
        "id": "9896a715.0e7a18",
        "type": "switch",
        "z": "712fca3d.852e64",
        "name": "",
        "property": "payload",
        "propertyType": "msg",
        "rules": [
            {
                "t": "eq",
                "v": "false",
                "vt": "str"
            },
            {
                "t": "else"
            }
        ],
        "checkall": "true",
        "repair": false,
        "outputs": 2,
        "x": 400,
        "y": 180,
        "wires": [
            [
                "87c5059f.b66db8"
            ],
            []
        ]
    },
    {
        "id": "87c5059f.b66db8",
        "type": "change",
        "z": "712fca3d.852e64",
        "name": "",
        "rules": [
            {
                "t": "set",
                "p": "payload",
                "pt": "msg",
                "to": "false",
                "tot": "bool"
            }
        ],
        "action": "",
        "property": "",
        "from": "",
        "to": "",
        "reg": false,
        "x": 580,
        "y": 180,
        "wires": [
            [
                "323b5c5b.9fa754"
            ]
        ]
    },
    {
        "id": "323b5c5b.9fa754",
        "type": "knxEasy-out",
        "z": "712fca3d.852e64",
        "server": "694306d4.2fb7f8",
        "topic": "1/0/0",
        "dpt": "1.001",
        "name": "",
        "outputtype": "write",
        "x": 810,
        "y": 180,
        "wires": []
    },
    {
        "id": "694306d4.2fb7f8",
        "type": "knxEasy-config",
        "z": "",
        "host": "192.168.1.113",
        "port": "3671"
    }
]

[
    {
        "id": "572a94f3.ef0fcc",
        "type": "alexa-local",
        "z": "712fca3d.852e64",
        "devicename": "KNX",
        "inputtrigger": false,
        "x": 200,
        "y": 580,
        "wires": [
            [
                "8c47cc5a.c71c4"
            ]
        ]
    },
    {
        "id": "688e1cf0.b59a04",
        "type": "knxEasy-out",
        "z": "712fca3d.852e64",
        "server": "694306d4.2fb7f8",
        "topic": "1/0/0",
        "dpt": "1.001",
        "name": "",
        "outputtype": "write",
        "x": 570,
        "y": 580,
        "wires": []
    },
    {
        "id": "8c47cc5a.c71c4",
        "type": "change",
        "z": "712fca3d.852e64",
        "name": "2boolean",
        "rules": [
            {
                "t": "change",
                "p": "payload",
                "pt": "msg",
                "from": "off",
                "fromt": "str",
                "to": "false",
                "tot": "bool"
            },
            {
                "t": "change",
                "p": "payload",
                "pt": "msg",
                "from": "on",
                "fromt": "str",
                "to": "true",
                "tot": "bool"
            }
        ],
        "action": "",
        "property": "",
        "from": "",
        "to": "",
        "reg": false,
        "x": 400,
        "y": 580,
        "wires": [
            [
                "688e1cf0.b59a04"
            ]
        ]
    },
    {
        "id": "694306d4.2fb7f8",
        "type": "knxEasy-config",
        "z": "",
        "host": "192.168.1.113",
        "port": "3671"
    }
]

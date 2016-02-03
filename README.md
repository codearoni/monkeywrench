# Monkey Wrench

> A dynamic Extendscript engine for Photoshop

## About

Monkey Wrench allows you to test your scripts for Photoshop in real time. In lieu of restarting the host application every time you make a change, Monkey Wrench allows you to execute your script whenever you'd like.

## Usage

- Download the project and copy it to your extensions directory.
- **Windows:** C:\Program Files (x86)\Common Files\Adobe\CEP\extensions
- **Mac:** /Library/Application Support/Adobe/CEP/extensions


- Place any Extendscript(s) you would like to run the "scripts" directory.
- Open Monkey Wrench in Photoshop and click 'Fetch Scripts'.
- Select the script you wish to execute and click 'Run'.

## Notes
This extension relies on the [Common Extensibility Platform's](https://github.com/Adobe-CEP/CEP-Resources/blob/master/CEP_6.x/CSInterface.js) eval method. Effectively - whatever script you run is going to be evaluated as a string. Performance may suffer on extremely large scripts. Monkey Wrench is designed to be a "testing ground" for extension and Extendscript developers. It is yet untested in any kind of production environment.

Monkey Wrench includes the JSON object and Array's forEach method.

## Roadmap
- Make it pretty
- Pre-run linting

## License
MIT

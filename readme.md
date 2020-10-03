# Argentine Person Generator    

A REST api that generates JSON information resembling personal info. Can be used to populate cards for example.
Check it live - https://dame1.ar

## Endpoints 

GET @ /api/generate

Query strings:

**AMOUNT**

```
TYPE: INT

Defines the quantity of people to return - Default is 1

example: https://dame1.ar/api/generate?amount=5

Returns 5 people


```

**IMAGE**

```
TYPE: BOOL

Defines if you an image url, to use as a profile picture:

example: https://dame1.ar/api/generate?amount=5&image=true


```

## Version History    
0.1 - Initial Scaffolding - some views  
0.2 - Bootstrap, new pic api. New Front page, new design. New Script for generating argentine.  
0.3 - Api docs section, added query options for api.  
0.4 - About section started. Cleaned up code.  
0.5 - Mobile CSS queries.
0.6 - Footer, FAVICON. Css fixes. Readme Fixes
0.6.1 - Typos
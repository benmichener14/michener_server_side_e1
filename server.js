var http = require('http');
var server = http.createServer(requestHandler); 
server.listen(process.env.PORT, process.env.IP, startHandler);

function startHandler()
{
  var addr = server.address();
  console.log("Server listening at", addr.address + ":" + addr.port);
}

function requestHandler(req, res) 
{
  try
  {
    var url = require('url');
    var url_parts = url.parse(req.url, true);
    var query = url_parts.query;
    
    res.writeHead(200, {'Content-Type': 'application/json'});
    
    if (query['cmd'] == undefined)
      throw Error("A command must be specified");
      
    var result = {};
    if (query['cmd'] == 'calcDistance')
    {
      validateDistance(query);
      result = calcDistance(query);
    }
    else if (query['cmd'] == 'calcCost')
    {
      validateCost(query);
      result = calcCost(query);
    }
    else
    {
      throw Error("Invalid command: " + query['cmd']);
    }
 
    res.write(JSON.stringify(result));
    res.end('');
  }
  catch (e)
  {
    var error = {'error' : e.message};
    res.write(JSON.stringify(error));
    res.end('');
  }
}

function calcDistance(query)
{
    var budget = parseFloat(query["budget"]);
    var mpg = parseFloat(query["mpg"]);
    var fuelCost = parseFloat(query["fuelCost"]);
    var distance = (budget * mpg) / fuelCost;
    
    return {'distance': distance};
}

function validateDistance(query)
{
  //Check that the query is correct
    if(query['budget'] == undefined)
    {
      throw Error("Please specify budget");
    }
    if(isNaN(query['budget']))
    {
      throw Error("Invalid value for budget");
    }
    if(query['budget'] < 0)
    {
      throw Error("Get a Job");
    }
    if(query['mpg'] == undefined)
    {
      throw Error("Please specify mpg");
    }
    if(isNaN(query['mpg']))
    {
      throw Error("Invalid value for mpg");
    }
    if(query['mpg'] < 0)
    {
      throw Error("Stop breaking the laws of physics. Or get out of your electric car... Hippy");
    }
    if(query['fuelCost'] == undefined)
    {
      throw Error("Please specify fuelCost");
    }
    if(isNaN(query['fuelCost']))
    {
      throw Error("Invalid value for fuelCost");
    }
    if(query['fuelCost'] < 0)
    {
      throw Error("Calculate your damn fuelCost Properly.");
    }
    
    //End Check
}

function calcCost(query)
{
    var distance = parseFloat(query["distance"]);
    var mpg = parseFloat(query["mpg"]);
    var fuelCost = parseFloat(query["fuelCost"]);
    var cost = (distance * fuelCost) / mpg;
    
    return {'cost': cost};
}

function validateCost(query)
{
  //Check that the query is correct
    if(query['distance'] == undefined)
    {
      throw Error("Please specify distance");
    }
    if(isNaN(query['distance']))
    {
      throw Error("Invalid value for distance");
    }
    if(query['distance'] < 0)
    {
      throw Error("I... What? How?");
    }
    if(query['mpg'] == undefined)
    {
      throw Error("Please specify mpg");
    }
    if(isNaN(query['mpg']))
    {
      throw Error("Invalid value for mpg");
    }
    if(query['mpg'] < 0)
    {
      throw Error("Stop breaking the laws of physics. Or get out of your electric car... Hippy");
    }
    if(query['fuelCost'] == undefined)
    {
      throw Error("Please specify fuelCost");
    }
    if(isNaN(query['fuelCost']))
    {
      throw Error("Invalid value for fuelCost");
    }
    if(query['fuelCost'] < 0)
    {
      throw Error("Calculate your damn fuelCost Properly.");
    }
    
    //End Check
}
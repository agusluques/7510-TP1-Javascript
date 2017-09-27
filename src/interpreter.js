// agrego un nuevo metodo al prototipo de String
String.prototype.replaceAll = function(search, replacement) {
    var target = this;
    return target.replace(new RegExp(search, 'g'), replacement);
};

function Rule(name, args, facts) {
	this.name = name;
	this.args = args;
	this.facts = facts;

	this.replaceArgs = function(args){
		var listOfArgsTo = args.split(",");
		var listOfArgsFrom = this.args.split(",");

		listOfArgsTo = listOfArgsTo.map(function (str) {return str.trim();})
		listOfArgsFrom = listOfArgsFrom.map(function (str) {return str.trim();})

		var result = this.facts;
		for (var i = 0; i < listOfArgsTo.length; i++) {
		 	result = result.replaceAll(listOfArgsFrom[i], listOfArgsTo[i]);
		}

		return result;
	}
}

function Fact(name, args) {
	this.name = name;
	this.args = args;
}

var Interpreter = function () {

	var listOfFacts = [];
	var listOfRules = [];

	var createFact = function(fact){
		var name = fact.substring(0, fact.indexOf("("));
		var args = fact.substring(fact.indexOf("(") + 1, fact.indexOf(")"));
		
		var newFact = new Fact(name, args);

		listOfFacts.push(newFact);

	}

	var createRule = function(rule){
		var name = rule.substring(0, rule.indexOf("("));
		var args = rule.substring(rule.indexOf("(") + 1, rule.indexOf(")"));
		var facts = rule.substring(rule.indexOf(":-") + 2, rule.indexOf(").") +1);

		var newRule = new Rule(name, args, facts);

		listOfRules.push(newRule);

	}

	var isFactOrRule = function(factOrRule){
		if (factOrRule.indexOf(":-") >= 0) {
			createRule(factOrRule);
		}else{
			createFact(factOrRule);
		}
	}

	var canResolveFact = function(name, args){
		for (var i = 0; i < listOfFacts.length; i++) {
			if (listOfFacts[i].name == name && listOfFacts[i].args == args){
				return true;
			}
		}
		return false;
	}

	var canResolveRule = function(name, args){
		var result = false;
		for (var i = 0; i < listOfRules.length; i++) {			
			if (listOfRules[i].name == name){
				var argsReplaced = listOfRules[i].replaceArgs(args);

				var listOfFactsReplaced = argsReplaced.split("),");
				for (var i = 0; i < listOfFactsReplaced.length; i++) {
					var fact = listOfFactsReplaced[i];
					fact = fact.trim();
					if (fact[fact.length - 1] != ")")
						fact += ")"

					var name = fact.substring(0, fact.indexOf("("));
					var args = fact.substring(fact.indexOf("(") + 1, fact.indexOf(")"));

					if (canResolveFact(name, args)){
						result = true;
					}else{
						result = false;
						break;
					}
				}
				return result;
			}
		}
		return result;
	}

    this.parseDB = function (params, paramss, paramsss) {
    	
    	params.map(isFactOrRule);
    }

    this.checkQuery = function (params) {
        var name = params.substring(0, params.indexOf("("));
		var args = params.substring(params.indexOf("(") + 1, params.indexOf(")"));

		var result = false;
		if (canResolveFact(name, args)){
			result = true;
		}else{
			result = canResolveRule(name, args);
		}

		return result;
    }

}

module.exports = Interpreter;


//ajoute un nombre de jour
//s'appel par la suite de la facon suivante 
// let aujourdhui = new Date();
// let demain = aujourdhui.addDays(1);
// let hier = aujourdhui.addDays(-1);
Date.prototype.addDays = function (days) {
  let date = new Date(this.valueOf());
  date.setDate(date.getDate() + days);
  return date;
}

// ne fonctionne que si l'intégralité des éléments sont identiques et si aucun motif "/!POWER2000!/" n'est present (on va pas se mentir c'est rare)
// dédoublonne les lignes identiques d'un array 2D (l'entiereté de la ligne est identique a l'entiereté d'une autre ligne)
function UberDedoublonnageArray2D(arrayEntree) {
  let arrayTempFlat = arrayEntree.map(row => row.join("/!POWER2000!/")).flat();
  let arrayTempUnique = [...new Set(arrayTempFlat)];
  let arrayResult = [];
  arrayTempUnique.forEach(e => {arrayResult.push(e.split("/!POWER2000!/"));});
  return arrayResult;
}

// fonction qui renvoi un array constitué uniquement des col choisi en parametre dans un array 1d (liste des index des col a conserver)
function ArrayColFilter2000(arraySource, arrayListIndexAConserver) {
  let arrayTemp = [];
  let arrayResult = [];
  if (arraySource.length<=0) {
    return "pas de data dans l'array source";
  }
  if (arrayListIndexAConserver.length<=0) {
    return "pas de data dans l'array d'index a conserver";
  }
  if (Math.max(...arrayListIndexAConserver)>arraySource[0].length) {
    return "L'index max a conserver est hors plage de l'array source";
  }
  arraySource.forEach(e => {arrayTemp = [];arrayListIndexAConserver.forEach(i => {arrayTemp.push(e[i])});arrayResult.push(arrayTemp)});
  return arrayResult;
}


//check si la valeur d'entrée est un nombre sinon renvoi la valeur de remplacement
function isNumElse(value,replace) {
  return isNan(value) ? replace : value; 
}

// rechercher la position d'une valeur dans une col d'un array 2D
function IndexInCol2D (array,numColACheck,varDeComparaion) {
  let result = array.map(row => row[numColACheck]).flat().indexOf(varDeComparaion);
  return result
}

// somme de col d'un array
function SOMMECOLARRAY (array,colpoursum) {
  if (array.length<1) {
    return "Array vide !";
  }
  if (array[0].length<colpoursum) {
    return "Col à additionner en dehors de l'array !";
  }
  var result = array.reduce((accumulator, currentValue) => accumulator + (currentValue[colpoursum]*1),0);
  return result;
}



//converti une date en format aaaa-ss (iso)
function DATEAAAASS(d) {
    // Copy date so don't modify original
    d = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
    // Set to nearest Thursday: current date + 4 - current day number
    // Make Sunday's day number 7
    d.setUTCDate(d.getUTCDate() + 4 - (d.getUTCDay()||1));
    // Get first day of year
    var yearStart = new Date(Date.UTC(d.getUTCFullYear(),0,1));
    // Calculate full weeks to nearest Thursday
    var weekNo = Math.ceil(( ( (d - yearStart) / 86400000) + 1)/7);
    // Return array of year and week number
    if (weekNo < 10){
      return d.getUTCFullYear()+"-0"+weekNo;
    }
    if (weekNo > 9){
      return d.getUTCFullYear()+"-"+weekNo;
    }
}

//check si l'entrée est une date et si oui la renvoi formaté dd/MM/yyyy
//exemple Browser.msgBox(today()); renvoi 09/09/2020
function DateStandard (date) {
  var timezone = "Europe/Paris" 
  if (isValidDate(date)) {
    var FormatedDate = Utilities.formatDate(date, timezone, "dd/MM/yyyy"); 
    return (FormatedDate);
  }
  else {
    return "l'entrée n'est pas une date";
  }
}

function isValidDate(d) {
  if ( Object.prototype.toString.call(d) !== "[object Date]" )
    return false;
  return !isNaN(d.getTime());
}


// fonction qui extrait d'un array les données entre 2 dates
function FiltreArrayEntreDates (array,indexDeColDateACheck,dateDeb,dateFin) {
  let dateDebB = dateDeb.valueOf();
  let dateFinB = dateFin.valueOf();
  if (array.length>0) {
    if (dateDebB<dateFinB) {
      if (indexDeColDateACheck<= array[0].length) {
        let result= array.filter(row => new Date(row[indexDeColDateACheck]).valueOf() >= dateDebB && new Date(row[indexDeColDateACheck]).valueOf() <= dateFinB);
        return result
      }
      return "Index hors plage";
    }  
    return "Date de debut sup a date de fin";
  }
  return "Date de debut sup a date de fin";
}


// DANS UN ARRAY AVEC TITRE INTEGRE DANS L ARRAY !!! (donc penser à ne pas sauter la col de titre dans la def de l'array)
// cheche dans un array la var de comparaison dans le champs souhaité et renvoi la valeur corespondante dans le champs souhaité
// exemple sur un array basé sur fichier effectif : 
// Browser.msgBox(FindInArrayV2(arrayeffectif,"NOM PRENOM","REQ","ROBERT Nicolas")); renverra "LOTHIE Sylvain"
function FindInArray (array,nomduchampsderecherche,nomduchampsarenvoyer,vardecomparaison) {
  var ixacheck = array[0].indexOf(nomduchampsderecherche);
  if (ixacheck<0) {
    return "Champs de recherche inexistant";
  }
  var ixareturn = array[0].indexOf(nomduchampsarenvoyer);
  if (ixareturn<0) {
    return "Champs à renvoyer inexistant";
  }
  var arrayfiltered = array.filter(row => row[ixacheck] === vardecomparaison);
  if (arrayfiltered.length >0) {
    return arrayfiltered[0][ixareturn];
  }
  else {
    return "Aucune donnée";
  }
}

function FindInArrayV2 (array,nomduchampsderecherche,nomduchampsarenvoyer,vardecomparaison) {
  var ixacheck = array[0].indexOf(nomduchampsderecherche);
  if (ixacheck<0) {
    return "Champs de recherche inexistant";
  }
  var ixareturn = array[0].indexOf(nomduchampsarenvoyer);
  if (ixareturn<0) {
    return "Champs à renvoyer inexistant";
  }
  var found = array.find(row => row[ixacheck] === vardecomparaison);
  if (found.length > 0) {
    return found[0][ixareturn];
  }
  else {
    return "Aucune donnée";
  }
}

//renvoi un array sans les lignes dont les valeurs de la colonnes choisi sont égales de la variable de comparaison
// exemple sur un array basé sur fichier effectif : 
// Browser.msgBox(FiltreArrayParColIsDif(arrayeffectif,5,"Terminated")); renverra l'array effectif sans les lignes de cc out
function FiltreArrayParColIsDif (array, col, vardecomparaison) {
  var arrayfiltered= array.filter(function (row) {
     return row[col] !== vardecomparaison;
  });
  if (arrayfiltered.length >0) {
    return arrayfiltered;
  }
  else {
    return "Aucune donnée";
  }
}

//renvoi un array constitué des lignes dont les valeurs de la colonnes choisi sont egales à la variable de comparaison
// exemple sur un array basé sur fichier effectif : 
// Browser.msgBox(FiltreArrayParColIsEqual(arrayeffectif,5,"Actif")); renverra l'array effectif uniquement des Actifs
function FiltreArrayParColIsEqual (array,col,vardecomparaison) {
  var arrayfiltered= array.filter(function (row) {
     return row[col] === vardecomparaison;
  });
  if (arrayfiltered.length >0) {
    return arrayfiltered;
  }
  else {
    return "Aucune donnée";
  }
}

//renvoi un array constitué uniquement des lignes dont les valeurs de la colonnes choisi sont superieur de la variable de comparaison
// exemple sur un array basé sur fichier effectif : 
// Browser.msgBox(FiltreArrayParColIsSup(arrayeffectif,14,34)); renverra l'array effectif uniquement des cc dont le tps hebdo est sup a 34
function FiltreArrayParColIsSup (array,col,vardecomparaison) {
  var arrayfiltered= array.filter(function (row) {
     return row[col] > vardecomparaison;
  });
  if (arrayfiltered.length >0) {
    return arrayfiltered;
  }
  else {
    return "Aucune donnée";
  }
}

//renvoi un array constitué uniquement des lignes dont les valeurs de la colonnes choisi sont superieur de la variable de comparaison
// exemple sur un array basé sur fichier effectif : 
// Browser.msgBox(FiltreArrayParColIsInf(arrayeffectif,14,35)); renverra l'array effectif uniquement des cc dont le tps hebdo est inf a 35
function FiltreArrayParColIsInf (array,col,vardecomparaison) {
  var arrayfiltered= array.filter(function (row) {
     return row[col] < vardecomparaison;
  });
  if (arrayfiltered.length >0) {
    return arrayfiltered;
  }
  else {
    return "Aucune donnée";
  }
}

//renvoi un array constitué uniquement des lignes dont les valeurs de la colonnes choisi sont superieur de la variable de comparaison
// exemple sur un array basé sur fichier effectif : 
// Browser.msgBox(FiltreArrayParColIsSupOrEqual(arrayeffectif,14,34)); renverra l'array effectif uniquement des cc dont le tps hebdo est sup ou egal a 34
function FiltreArrayParColIsSupOrEqual (array,col,vardecomparaison) {
  var arrayfiltered= array.filter(function (row) {
     return row[col] >= vardecomparaison;
  });
  if (arrayfiltered.length >0) {
    return arrayfiltered;
  }
  else {
    return "Aucune donnée";
  }
}

//renvoi un array constitué uniquement des lignes dont les valeurs de la colonnes choisi sont superieur de la variable de comparaison
// exemple sur un array basé sur fichier effectif : 
// Browser.msgBox(FiltreArrayParColIsInfOrEqual(arrayeffectif,14,35)); renverra l'array effectif uniquement des cc dont le tps hebdo est inf ou egal a 35
function FiltreArrayParColIsInfOrEqual (array,col,vardecomparaison) {
  var arrayfiltered= array.filter(function (row) {
     return row[col] <= vardecomparaison;
  });
  if (arrayfiltered.length >0) {
    return arrayfiltered;
  }
  else {
    return "Aucune donnée";
  }
}

//renvoi un array constitué uniquement des lignes dont les valeurs de la colonnes choisi sont vides
// exemple sur un array basé sur fichier effectif : 
// Browser.msgBox(FiltreArrayParColIsNull(arrayeffectif,0)); renverra l'array effectif uniquement des cc n'ayant pas de matricule
function FiltreArrayParColIsNull (array,col) {
  var arrayfiltered= array.filter(function (row) {
     return row[col] === "";
  });
  if (arrayfiltered.length >0) {
    return arrayfiltered;
  }
  else {
    return "Aucune donnée";
  }
}

//renvoi un array constitué uniquement des lignes dont les valeurs de la colonnes choisi ne sont pas vides
// exemple sur un array basé sur fichier effectif : 
// Browser.msgBox(FiltreArrayParColIsNotNull(arrayeffectif,37)); renverra l'array effectif uniquement des cc ayant un tag affectation
function FiltreArrayParColIsNotNull(array,col) {
  var arrayfiltered= array.filter(function (row) {
     return row[col] !== "";
  });
  if (arrayfiltered.length >0) {
    return arrayfiltered;
  }
  else {
    return "Aucune donnée";
  }
}

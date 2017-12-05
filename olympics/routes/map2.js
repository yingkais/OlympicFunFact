var express = require('express');
var router = express.Router();

var oracledb = require('oracledb');
var dbConfig = require('./dbconfig.js');
var dbConfigUser = {
    user          : dbConfig.user,
    password      : dbConfig.password,
    connectString : dbConfig.connectString
  };


router.get('/', function(req,res,next){
	res.render('Olympics.html');
	//console.log(req);
	// var year = req.query.year;
	// var medal = req.body.medal;
	// console.log(year);
	// console.log(medal);

});

var year;
var medal;
var sports;
var gender;

var res = [["UnitedStates",1],["Australia",3],["Hungary",3],["France",2],["Netherlands",2],["UnitedKingdom",1],["China",1],["Sweden",1],["Italy",1],["Denmark",1],["Kazakhstan",33],["Spain",1],["Singapore",333]];

var toBeSent = {"UnitedStates":10, 
	     				"France":10,
	     				"Germany":1,
	     				"Australia":3, 
	     				"UnitedKingdom":2, 
	     				"Russia":3,
	     				"Italy":4,
	     				"Sweden":1,
	     				"Canada":219,
	     				"China":189,
	     				"Argentina":2, 
	     				"Hungary":1,
	     				 "Norway":1, 
	     				 "Netherlands":1, 
	     				 "Poland":1, 
	     				 "Japan":1, 
	     				 "Finland":1, 
	     				 "Switzerland":1, 
	     				 "Austria":1,
	     				 "Denmark":120,
						"Romania":118,
						"SouthKorea":116,
						"Belgium":114,
						"Bulgaria":102,
						"Greece":100,
						"Czechoslovakia":99,
						"Ukraine":96,
						"Spain":95,
						"Cuba":88,
						"Belarus":68,
						"NewZealand":65,
						"Brazil":64,
						"Czech":57,
						"Kazakhstan":57,
						"Yugoslavia":55,
						"SouthAfrica":53,
						"Turkey":46,
						"Argentina":43,
						"Azerbaijan":39,
						"NorthKorea":38,
						"Mexico":35,
						"Iran":33,
						"Croatia":32,
						"Slovenia":31,
						"Estonia":30,
						"Uzbekistan":26,
						"Ireland":24,
						"Egypt":23,
						"Georgia":22,
						"Kenya":21,
						"Latvia":20,
						"Mongolia":19,
						"Colombia":19,
						"Portugal":19,
						"Thailand":18,
						"Slovakia":18,
						"Lithuania":17,
						"Nigeria":16,
						"Jamaica":16,
						"Taiwan":15,
						"Armenia":15,
						"Venezuela":14,
						"India":14,
						"Indonesia":13,
						"Serbia":13,
						"Algeria":12,
						"Morocco":11,
						"Chile":11,
						"TrinidadTobago":9,
						"Tunisia":9,
						"Australasia":9,
						"Ethiopia":9,
						"PuertoRico":8,
						"Moldova":8,
						"Malaysia":7,
						"SouthKorea":7,
						"Israel":7,
						"Luxembourg":7,
						"Philippines":7,
						"Bohemia":7,
						"Uganda":6,
						"Bahamas":6,
						"Uruguay":6,
						"DominicanRepublic":6,
						"YugoslavFederation":6,
						"Liechtenstein":5,
						"Zimbabwe":5,
						"Peru":4,
						"Iceland":4,
						"Kyrgyzstan":4,
						"Vietnam":4,
						"Qatar":4,
						"Tajikistan":4,
						"Cameroon":4,
						"Singapore":4,
						"Lebanon":4,
						"Syria":3,
						"SaudiArabia":3,
						"Pakistan":3,
						"ChineseTaipei":3,
						"HongKong":3,
						"IvoryCoast":3,
						"Bahrain":3,
						"Ghana":3,
						"Panama":3,
						"BritishIndia":0,
						"Zambia":2,
						"UnitedArabEmirates":2,
						"Independent":2,
						"Tanzania":2,
						"Kuwait":2,
						"Afghanistan":2,
						"Haiti":2,
						"Niger":2,
						"Burundi":2,
						"Namibia":2,
						"BritishWestIndies":2,
						"SriLanka":2,
						"CostaRica":2,
						"VirginIslandsUS":1,
						"Iraq":1,
						"Sudan":1,
						"Tonga":1,
						"Fiji":1,
						"Macedonia":1,
						"Togo":1,
						"Guyana":1,
						"Paraguay":1,
						"Jordan":1,
						"Botswana":1,
						"Suriname":1,
						"Montenegro":1,
						"Barbados":1,
						"Senegal":1,
						"Mozambique":1,
						"Guatemala":1,
						"SerbiaandMontenegro":1,
						"Djibouti":1,
						"NetherlandAntilles":1,
						"Gabon":1,
						"Ecuador":1,
						"Mauritius":1,
						"Cyprus":1,
						"Grenada":1,
						"Bermuda":1,
						"Eritrea":1,
						"Monaco":1,
						"Kosovo":1}




router.post('/', function(req, res, next) {
	  	console.log(req.body);
		 year = req.body.yearData;
		 medal = req.body.medalData;
	     sport = req.body.sportData;
	     gender = req.body.genderData;



	      //year medal sports 
			if (year != 0 && !(medal === 'empty') && !(sports === 'empty')) {
				var sqlquery =  "WITH S AS ( " +
		                    "SELECT EVENT_ID " +
		                    "FROM EVENT " +
		                    "WHERE SPORT = '" + sports + "'), " +
		                    "T AS ( " +
		                    "SELECT YEAR, A.NATIONALITY, A.EVENT_ID, A.MEDAL " +
		                    "FROM AWARD A " +
		                    "WHERE A.EVENT_ID IN (SELECT * FROM S) AND A.MEDAL = '" + medal + "' AND A.YEAR = '" + year + "' " +
		                    "GROUP BY A.NATIONALITY, A.EVENT_ID, A.MEDAL, A.YEAR)," +
		                    "FINAL AS (SELECT Nationality, COUNT(MEDAL) AS TOTAL " +
		                    "FROM T " +
		                    "GROUP BY NATIONALITY) " +
		                    "SELECT C.NATION_C, F.TOTAL " +
		                    "FROM FINAL F JOIN COUNTRY C ON F.NATIONALITY = C.NATION " +
		                    "ORDER BY TOTAL DESC ";
		    console.log(sqlquery);
			  sqlConnection(req,res,sqlquery);
		  } 
		  //medal sports
		  else if (year == 0 && !(medal === 'empty') && !(sports === 'empty')) {
		    var sqlquery =  "WITH S AS ( " +
		                    "SELECT EVENT_ID " +
		                    "FROM EVENT " +
		                    "WHERE SPORT = '" + sports + "'), " +
		                    "T AS ( " +
		                    "SELECT YEAR, A.NATIONALITY, A.EVENT_ID, A.MEDAL " +
		                    "FROM AWARD A " +
		                    "WHERE A.EVENT_ID IN (SELECT * FROM S) AND A.MEDAL = '" + medal + "' " +
		                    "GROUP BY A.NATIONALITY, A.EVENT_ID, A.MEDAL, A.YEAR)," +
		                    "FINAL AS (SELECT Nationality, COUNT(MEDAL) AS TOTAL " +
		                    "FROM T " +
		                    "GROUP BY NATIONALITY) " +
		                    "SELECT C.NATION_C, F.TOTAL " +
		                    "FROM FINAL F JOIN COUNTRY C ON F.NATIONALITY = C.NATION " +
		                    "ORDER BY TOTAL DESC ";
		    console.log(sqlquery);
		    sqlConnection(req,res,sqlquery);
		  } 
		  //sports
		  else if (year == 0 && medal === 'empty' && !(sports === 'empty')) {
		    var sqlquery =  "WITH S AS ( " +
		                    "SELECT EVENT_ID " +
		                    "FROM EVENT " +
		                    "WHERE SPORT = '" + sports + "'), " +
		                    "T AS ( " +
		                    "SELECT YEAR, A.NATIONALITY, A.EVENT_ID, A.MEDAL " +
		                    "FROM AWARD A " +
		                    "WHERE A.EVENT_ID IN (SELECT * FROM S) " +
		                    "GROUP BY A.NATIONALITY, A.EVENT_ID, A.MEDAL, A.YEAR)," +
		                    "FINAL AS (SELECT Nationality, COUNT(MEDAL) AS TOTAL " +
		                    "FROM T " +
		                    "GROUP BY NATIONALITY) " +
		                    "SELECT C.NATION_C, F.TOTAL " +
		                    "FROM FINAL F JOIN COUNTRY C ON F.NATIONALITY = C.NATION " +
		                    "ORDER BY TOTAL DESC ";
		    console.log(sqlquery);
		    sqlConnection(req,res,sqlquery);

		  }
		  //all default
		  else if (year == 0 && medal === 'empty' && sports === 'empty') {
		    var sqlquery =  "WITH Summation AS ( " +
		                    "SELECT P.NOC, SUM(P.TOTAL) AS SUM " +
		                    "FROM PARTICIPATE P " +
		                    "GROUP BY P.NOC), " +
		                    "Summation2 AS ( " +
		                    "SELECT C.Nation_C, Summation.SUM AS SUM1 " +
		                    "FROM Summation NATURAL JOIN COUNTRY C) " +
		                    "SELECT Nation_C, SUM(SUM1) AS TOTAL_MEDAL " +
		                    "FROM Summation2 " +
		                    "GROUP BY Nation_C " +
		                    "ORDER BY TOTAL_MEDAL DESC ";
		    console.log(sqlquery);
		    sqlConnection(req,res,sqlquery);


		  }
		  //medal
		  else if (year == 0 && !(medal === 'empty') && sports === 'empty'){
		    var sqlquery =  "WITH Summation AS ( " +
		                    "SELECT P.NOC, SUM(P." + medal + ") AS SUM " +
		                    "FROM PARTICIPATE P " +
		                    "GROUP BY P.NOC), " +
		                    "Summation2 AS ( " +
		                    "SELECT C.Nation_C, Summation.SUM AS SUM1 " +
		                    "FROM Summation NATURAL JOIN COUNTRY C) " +
		                    "SELECT Nation_C, SUM(SUM1) AS TOTAL_MEDAL " +
		                    "FROM Summation2 " +
		                    "GROUP BY Nation_C " +
		                    "ORDER BY TOTAL_MEDAL DESC ";
		    console.log(sqlquery);
		    sqlConnection(req,res,sqlquery);
		  }
		  //year medal
		  else if (year != 0 && !(medal === 'empty') && sports === 'empty'){
		    var sqlquery =  "WITH PREP AS (SELECT P.NOC, P." + medal + " AS SUM1 " +
		                    "FROM PARTICIPATE P JOIN COUNTRY C ON P.NOC = C.NOC " +
		                    "WHERE P.YEAR = '" + year + "' " + ") " +
		                    "SELECT C.Nation_C, SUM(P1.SUM1) AS TOTAL " +
		                    "FROM PREP P1 NATURAL JOIN COUNTRY C " +
		                    "GROUP BY Nation_C " +
		                    "ORDER BY TOTAL DESC ";
		    console.log(sqlquery);
		    sqlConnection(req,res,sqlquery);
		  }
		  //year sports
		  else if (year != 0 && medal === 'empty' && !(sports === 'empty')){
		    var sqlquery =  "WITH S AS ( " +
		                    "SELECT EVENT_ID " +
		                    "FROM EVENT " +
		                    "WHERE SPORT = '" + sports + "'), " +
		                    "T AS ( " +
		                    "SELECT YEAR, A.NATIONALITY, A.EVENT_ID, A.MEDAL " +
		                    "FROM AWARD A " +
		                    "WHERE A.EVENT_ID IN (SELECT * FROM S) AND A.YEAR = '" + year + "' " +
		                    "GROUP BY A.NATIONALITY, A.EVENT_ID, A.MEDAL, A.YEAR)," +
		                    "FINAL AS (SELECT Nationality, COUNT(MEDAL) AS TOTAL " +
		                    "FROM T " +
		                    "GROUP BY NATIONALITY) " +
		                    "SELECT C.NATION_C, F.TOTAL " +
		                    "FROM FINAL F JOIN COUNTRY C ON F.NATIONALITY = C.NATION " +
		                    "ORDER BY TOTAL DESC ";
		    console.log(sqlquery);
		    sqlConnection(req,res,sqlquery);
		  }
		  //year
		  else if (year != 0 && medal === 'empty' && sports === 'empty'){
		    var sqlquery =  "WITH PREP AS (SELECT P.NOC, P.TOTAL AS SUM1 " +
		                    "FROM PARTICIPATE P JOIN COUNTRY C ON P.NOC = C.NOC " +
		                    "WHERE P.YEAR = '" + year + "' " + ") " +
		                    "SELECT C.Nation_C, SUM(P1.SUM1) AS TOTAL " +
		                    "FROM PREP P1 NATURAL JOIN COUNTRY C " +
		                    "GROUP BY Nation_C " +
		                    "ORDER BY TOTAL DESC ";
		    console.log(sqlquery);
		    sqlConnection(req,res,sqlquery);
		  }


		  var sqlConnection = function(req,res,sqlquery){
		  oracledb.getConnection(dbConfigUser, function(err, connection) {
		    if (err) {
		      console.error(err.message);
		      return;
		    }
		    connection.execute(
		      sqlquery,
		      // The "bind value" 180 for the "bind variable" :id
		      [],

		      // Optional execute options argument, such as the query result format
		      // or whether to get extra metadata
		      // { outFormat: oracledb.OBJECT, extendedMetaData: true },

		      // The callback function handles the SQL execution results
		      function(err, result)
		      {
		        if (err) {
		          console.error(err.message);
		          doRelease(connection);
		          return;
		        }
		        //res.json(result.rows);
		        res = result.rows;
		        // console.log(result.metaData); // [ { name: 'DEPARTMENT_ID' }, { name: 'DEPARTMENT_NAME' } ]
		        // console.log(result.rows);     // [ [ 180, 'Construction' ] ]
		        doRelease(connection);
		      });
		  });

		}






	     Object.keys(toBeSent).forEach(function(key) {
	     	var i;
	     	for (i = 0; i < res.length; i++){
	     		if (key === res[i][0]){
	     			toBeSent[key] = res[i][1];
	     		}
	     	}
		 });

		 console.log(toBeSent.France);

		 res.json(toBeSent);

});

function doRelease(connection)
{
  connection.close(
    function(err) {
      if (err) {
        console.error(err.message);
      }
    });
}

module.exports = router;
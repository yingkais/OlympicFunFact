"WITH T AS ( " + 
"SELECT EVENT_ID " + 
"FROM EVENT " + 
"WHERE SPORT = '" + sports + "') " +
"SELECT NATIONALITY, count(distinct EVENT_ID) AS NUM " +
"FROM ( SELECT * " +
"FROM AWARD A " +
"WHERE A.EVENT_ID IN (SELECT * FROM T) " +
"ORDER BY A.EVENT_ID) " +
" GROUP BY NATIONALITY " +
"ORDER BY NUM DESC "

" WITH T AS (SELECT EVENT_ID FROM EVENT WHERE SPORT = '" + sports + 
	  "') SELECT NATIONALITY, count(distinct EVENT_ID) AS NUM FROM (SELECT * FROM AWARD A WHERE A.year = " + year + 
	  " and A.EVENT_ID IN (SELECT * FROM T) AND WHERE MEDAL = '" + medal + 
	  "' GROUP BY NATIONALITY ORDER BY NUM DESC ";
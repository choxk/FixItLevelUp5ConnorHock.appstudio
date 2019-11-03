/* Scenario: The user should be able to see all of the companies currently in the 
database when the program starts and the form loads. Then they can pick one, and 
the program will show them all of the information for that company in a nice format like this:   

          Bobs Company
          2112 F St.
          Omaha, NE 55678

Requirements:
  - Use only controls (no popups unless Modal, no prompts, etc).
  - Use only template literals.
  - Use a dropdown for showing the company names
  - Use a control of your choice to display the company details
  - Change at least 5 properties of the form and/or controls to improve how it looks visually. */
  
  
  
  
  seeCustomers.onshow=function(){
    let query = "SELECT DISTINCT state FROM customer"
  req1 = Ajax("https://ormond.creighton.edu/courses/375/ajax-connection.php", "POST", "host=ormond.creighton.edu&user=cjh22435&pass=BIA375!&database=cjh22435&query=" + query)
if (req1.status = 200) {
  results = JSON.parse(req1.responseText)
  
  if (results == 0) {
} else {
  let message = ""
  for (i = 0; i <= results.length - 1; i++) {
    message = message + results[i][0] + "\n"
    }
    txtStateOptions.value = message
  }
  } else {
        }
}

btnGo.onclick=function(){
let selection = inptState.value
let query = "SELECT name FROM customer WHERE state = " + '"' + selection + '"'
  req1 = Ajax("https://ormond.creighton.edu/courses/375/ajax-connection.php", "POST", "host=ormond.creighton.edu&user=cjh22435&pass=BIA375!&database=cjh22435&query=" + query)
    if (req1.status = 200) {
        results = JSON.parse(req1.responseText)
          if (results == 0) {
        } else {
          lblCompany.value = results + "\n"
            }
  } else {
    }
  
}
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
  drpCompanyNames.clear()
  let query = "SELECT name FROM customer"
  req1 = Ajax("https://ormond.creighton.edu/courses/375/ajax-connection.php", "POST", "host=ormond.creighton.edu&user=sch54620&pass=C19971106w&database=sch54620&query=" + query)
  
  if (req1.status == 200) {
    let results = JSON.parse(req1.responseText)
    if (results.length == 0)
        txtResults.value("There are no company names.")
    else {        
        let message = ""
        for (i = 0; i <= results.length - 1; i++){
            message = message + results[i][0] + "\n"
            drpCompanyName.addItem(results[i][0])
        }
     } 
  } else{
      NSB.MsgBox("Something run")
  }
  hamMenu.clear()
  hamMenu.addItem("Sign In/Out") 
  hamMenu.addItem("See Customers")
  hamMenu.addItem("Delete Customers")
  hamMenu.addItem("Edit Customers")
  hamMenu.addItem("Add Customers")
}



drpCompanyNames.onclick=function(s){
    if (typeof(s) == "object"){  
    return 
    } else {
      drpCompanyNames.value = s 
  
      let query2 = "SELECT * FROM customer WHERE name=" + '"' + drpCompanyNames.selection + '"' 
      req2 = Ajax("https://ormond.creighton.edu/courses/375/ajax-connection.php", "POST", "host=ormond.creighton.edu&user=sch54620&pass=C19971106w&database=sch54620&query=" + query2)
      
      if (req2.status == 200) {
          let results2 = JSON.parse(req2.responseText)
          if (results2.length == 0){
              txtResults.value("There are no companies of that name/type.")
          }else {        
              console.log("The parsed JSON is " + results2)
              console.log("eg. temp[0] or the first row in the big array is " + results2[0])
              console.log("To retrieve to Paul, must have results[0][1]: " + results2[0][2])
              let message2 = ""
              for (i = 1; i <= 2; i++)
                  message2 = message2 + results2[0][i] + "\n"
              for (i =3; i <=5; i++)
                  message2 = message2 + results2[0][i] + ", "
              txtResults.value = message2
          } 
      }else{
        NSB.MsgBox("Error")
      }
   }
}

hamMenu.onclick=function(s){
    if (typeof(s) == "object") {
       return
    }
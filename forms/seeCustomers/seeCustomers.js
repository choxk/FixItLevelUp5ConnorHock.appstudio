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
            drpCompanyNames.addItem(results[i][0])
        }
     } 
  } else {
      NSB.MsgBox("Something run")
  }
  hamMenu.clear()
  hamMenu.addItem("See Customers")
  hamMenu.addItem("Edit Customers")
  hamMenu.addItem("Delete Customers")
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
          } else {        
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
      } else {
        NSB.MsgBox("Error")
      }
   }
}

hamMenu.onclick=function(s){
    if (typeof(s) == "object") {
       return
    }
    switch(s) {
      case "See Customers":
          ChangeForm(seeCustomers)
          break
       case "Edit Customers":
          ChangeForm(deleteUpdateCustomer)
          break
       case "Delete Customers":
          ChangeForm(deleteUpdateCustomer)
          break
      case "Add Customers":
          ChangeForm(addCustomer)
          break
     }
}
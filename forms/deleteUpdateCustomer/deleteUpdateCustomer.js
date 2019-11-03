deleteUpdateCustomer.onshow=function(){
    drpCompanyNames1.clear()
    let query = "SELECT name FROM customer"
    req1 = Ajax("https://ormond.creighton.edu/courses/375/ajax-connection.php", "POST", "host=ormond.creighton.edu&user=sch54620&pass=C19971106w&database=sch54620&query=" + query)
  
    if (req1.status == 200) {
       results = JSON.parse(req1.responseText)
       if (results.length == 0)
           txtResults1.value("There are no company names.")
       else {        
           let message = ""
           for (i = 0; i <= results.length - 1; i++){
               message = message + results[i][0] + "\n"
               drpCompanyNames1.addItem(results[i][0])
           }
       } 
   }else{
      NSB.MsgBox("Something run")
  }
  hamMenu1.clear()
  hamMenu1.addItem("See Customers")
  hamMenu1.addItem("Edit Customers")
  hamMenu1.addItem("Delete Customers")
  hamMenu1.addItem("Add Customers")
}


drpCompanyNames1.onclick=function(s){
  if (typeof(s) == "object"){ 
    return
  } else {
    drpCompanyNames1.value = s 
  }
}

btnSubmit.onclick=function(){
if (rdoChoice.value ==0){


  let dName = drpCompanyNames1.value
    let found = false
    for (i = 0; i <= results.length - 1; i++) {
        if (dName == results[i][0])
            found = true
    }
    if (found == false) 
       NSB.MsgBox("That name is not in the database.")
    else if (found == true) {
      let queryDelete = "DELETE FROM customer WHERE name = " + '"' + dName + '"'
      req4 = Ajax("https://ormond.creighton.edu/courses/375/ajax-connection.php", "POST", "host=ormond.creighton.edu&user=sch54620&pass=C19971106w&database=sch54620&query=" + queryDelete)

      if (req4.status == 200) { 
        if (req4.responseText == 500){ 
            let message = ""
            for (i=0; i <= results.length-1; i++){
                let query4="SELECT name FROM customer"
                req5 = Ajax("https://ormond.creighton.edu/courses/375/ajax-connection.php", "POST", "host=ormond.creighton.edu&user=sch54620&pass=C19971106w&database=sch54620&query=" + query4)

            if (req5.status==200){
              results=JSON.parse(req5.responseText)
                  
            let message = ""
              for (i=0; i <= results.length-1; i++)
                message = message + results[i][0] + "\n"
              txtResults1.value = message
                
            } else {
                NSB.MsgBox("Error: " + req1.status)
              }
           }
            
        } else {
            NSB.MsgBox("There was an error deleting " + dName + " from the database.")
        }
      } else {
        NSB.MsgBox("Error: " + req5.status);
      }  
  } 


}else if (rdoChoice.value == 1){
   let oldName = drpCompanyNames1.selection
   let newName = inptNewName.value
   let query2 = "UPDATE customer SET name =" + '"' + newName + '"' + " WHERE name = " + '"' + oldName + '"'
   
   req2 = Ajax("https://ormond.creighton.edu/courses/375/ajax-connection.php", "POST", "host=ormond.creighton.edu&user=sch54620&pass=C19971106w&database=sch54620&query=" + query2)
   
   if (req2.status == 200) {
        if (req2.responseText == 500) {  
            var result2 = JSON.parse(req2.responseText)
            
          let query3 = "SELECT name FROM customer"
          req3 = Ajax("https://ormond.creighton.edu/courses/375/ajax-connection.php", "POST", "host=ormond.creighton.edu&user=sch54620&pass=C19971106w&database=sch54620&query=" + query3)
            
          if (req3.status == 200) { //transit worked.
              let results3 = JSON.parse(req3.responseText)
              if (results3.length == 0)
                  txtResults1.value("There are no company of that type.")
              else {        
                  console.log("the parsed JSON is for result3 is " + results3)
                  console.log("eg. temp[0] or first row in big array is " + results3[0][0])
                  let message2 = ""
                  for (i = 1; i <= results3.length-1; i++)
                    message2 = message2 + results3[i] + "\n"
                     
                txtResults1.value=message2
                } 
          } else
              NSB.MsgBox("Error")
            
      } else
          NSB.MsgBox("There was a problem changing the company's name.")

    } 
  }
}

hamMenu1.onclick=function(s){
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
 let budget = [
    {
    
    }
]

function calculate(){
    var monthlyIncome = document.querySelector(".total-input ").value;
    var sumTotal = Number(0);
    var amountSum = document.querySelectorAll(".amount_sum");
    amountSum.forEach(amount => {
    sumTotal += Number(amount.innerHTML.replace(/[^0-9\.]+/g,""));
    document.querySelector(".total_amount").innerHTML = "$" + sumTotal.toFixed(2)
    // console.log(sumTotal);
    });

    var table = document.getElementById("myTable");
    for (var i = 1; i < table.rows.length-1; i++) {
            var entry = table.rows[i].cells[0].textContent;
            var amount = (table.rows[i].cells[1].textContent);
            amount = amount.replace("$", "");
            amount = parseFloat(amount);
            var category = table.rows[i].cells[2].textContent;
            // console.log(entry);
            // console.log(amount);
            // console.log(category);
            budget[i] = {entry: entry, amount: amount, category: category};
            var bills = 0;
            var entertainment = 0;  
            var food = 0;  
            var gas = 0;
            var groceries = 0;
            var health = 0;  
            var shopping = 0;
            var travel = 0; 
            var misc = 0; 

            for (let i = 1; i < budget.length; i++) {
                    if (budget[i].category === 'Bills & Utilities'){
                        bills += budget[i].amount;  
                    }else if (budget[i].category === 'Entertainment'){
                        entertainment += budget[i].amount; 
                    }else if (budget[i].category === 'Food & Drink'){
                        food += budget[i].amount; 
                    }else if (budget[i].category === 'Gas'){
                        gas += budget[i].amount; 
                    }else if (budget[i].category === 'Groceries'){
                        groceries += budget[i].amount; 
                    }else if (budget[i].category === 'Health'){
                        health += budget[i].amount; 
                    }else if (budget[i].category === 'Shopping'){
                        shopping += budget[i].amount; 
                    }else if (budget[i].category === 'Travel'){
                        travel += budget[i].amount; 
                    }else{
                        misc += budget[i].amount; 
                    }                
            }
        }
            // console.log(bills);
            // console.log(entertainment);
            // console.log(food);
            // console.log(gas);
            // console.log(groceries);
            // console.log(health);
            // console.log(shopping);
            // console.log(misc);
            var billsX = (bills/sumTotal)*100;
            var entertainmentX = (entertainment/sumTotal)*100;  
            var foodX = (food/sumTotal)*100;  
            var gasX = (gas/sumTotal)*100;
            var groceriesX = (groceries/sumTotal)*100;
            var healthX = (health/sumTotal)*100;  
            var shoppingX = (shopping/sumTotal)*100;
            var travelX = (travel/sumTotal)*100; 
            var miscX = (misc/sumTotal)*100; 
            var chart = new CanvasJS.Chart("chartContainer", {
                animationEnabled: true,
                data: [{
                    type: "doughnut",
                    startAngle: 240,
                    yValueFormatString: "##0.0\"%\"",
                    indexLabel: "{label} {y}",
                    dataPoints: [
                        { y: billsX, label: "Bills & Utilities" },
                        { y: entertainmentX, label: "Entertainment" },
                        { y: foodX, label: "Food & Drink" },
                        { y: gasX, label: "Gas" },
                        { y: groceriesX, label: "Groceries" },
                        { y: healthX, label: "Health" },
                        { y: shoppingX, label: "Shopping" },
                        { y: travelX, label: "Travel" },
                        { y: miscX, label: "Misc." }               
                    ]
                }]
            });
            chart.render();
            let leftOver = monthlyIncome - sumTotal;
            console.log(leftOver);
}

// window.onload = function () {

//     var chart = new CanvasJS.Chart("chartContainer", {
//         animationEnabled: true,
//         data: [{
//             type: "doughnut",
//             startAngle: 240,
//             yValueFormatString: "##0.00\"%\"",
//             indexLabel: "{label} {y}",
//             dataPoints: [
//                 { y: 0, label: "Bills & Utilities" },
//                 { y: 0, label: "Entertainment" },
//                 { y: 16.16, label: "Food & Drink" },
//                 { y: 25.48, label: "Gas" },
//                 { y: 30.62, label: "Groceries" },
//                 { y: 9.09, label: "Health" },
//                 { y: 18.65, label: "Shopping" },
//                 { y: 0, label: "Travel" },
//                 { y: 0, label: "Misc." }               
//             ]
//         }]
//     });
//     chart.render();
// }

//Click event to add items and lines to the table
  $('#submit').on('click', function () {
    var itemInput = $(".item-input").val();
    var valueInput = parseFloat($(".value-input").val()).toFixed(2);
    var catInput = $("#cat-input option:selected").val();

    //Clear form inputs
    $('.my-form').each(function(){
           this.reset();         
    });
    // Adding a row inside the tbody.
    $('#myTable tr:first').after('<tr class="tbody_data"><td><span><i class="fas fa-pencil-alt edit"></i><i class="fas fa-trash-alt delete"></i></span>'+itemInput+'</td><td class="amount_sum">$'+valueInput+'</td><td>'+catInput+'</td></tr>');

    //Update total spending amount
    calculate();
  });


//Click on trash to Delete To entry
$(document).on("click",'.delete',function(){ 
    var tableRow = $(this).closest('tr');
    tableRow.find('td').fadeOut(500, 
        function(){ 
            tableRow.remove(); 
           //Update total spending amount
            calculate();                    
        }
    );  
 });


 

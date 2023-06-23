
        var btn_plus_length = document.getElementsByClassName('btn-plus').length;
        var item_count = 1 ;
        
        for(let i = 0 ; i<btn_plus_length ; i++)
        {
            document.getElementsByClassName('btn-plus')[i].addEventListener("click",(e)=>{
                
                // get the value of quantity
                let qtt_value = document.getElementsByClassName("field-qtt")[i].getAttribute("value");

               // add one on click (+)
               item_count = parseInt(qtt_value) + 1;
               qtt_value = item_count;
 
                // catch the element carry the total price 
                let total_price = document.getElementsByClassName("item-total-price")[i];

                // get the price 
                let item_price = parseInt(document.getElementsByClassName("item-price")[i].getAttribute("data-price"));
                 
                // calculate the total price and append it to the element
                total_price.textContent =  "Total price : " +(item_price * qtt_value) + " $";

                // set the total price attribute = total price
                var total_price_attribute =parseInt(total_price.getAttribute("total-price"));
                total_price_attribute  =  item_price * qtt_value;
               
                
            })
        }
        // minus button 

        for(let i = 0 ; i<btn_plus_length ; i++)
        {
            document.getElementsByClassName('btn-minus')[i].addEventListener("click",(e)=>{
                
                // get the value of quantity
                let qtt_value = document.getElementsByClassName("field-qtt")[i].getAttribute("value");

               // minus one on click (+)
               qtt_value = parseInt(qtt_value) - 1;

               if(qtt_value <= 1){
                qtt_value  = 1;
               }
 
                // catch the element carry the total price 
                let total_price = document.getElementsByClassName("item-total-price")[i];

                // get the price 
                let item_price = parseInt(document.getElementsByClassName("item-price")[i].getAttribute("data-price"));
                 
                // calculate the total price and append it to the element
                total_price.textContent =  "    Total price : " + item_price * qtt_value + " $";

                // set the total price attribute = total price
                var total_price_attribute =  parseInt(total_price.getAttribute("total-price"));
                total_price_attribute  =  item_price * qtt_value;
               
            })
        }

        for(let i = 0 ; i<btn_plus_length ; i++)
        {
                // add event on click (remove item)
                document.getElementsByClassName("remove-item")[i].addEventListener("click" , (e)=>{

                e.preventDefault();
                // remove item-info 
               let itemInfo = document.getElementsByClassName("item-info")[i];
               itemInfo.remove();
               //remove product-item
                let productItem = document.getElementsByClassName("product-item")[i];
                productItem.remove();

            })
        }
        
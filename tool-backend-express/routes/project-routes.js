const express         = require('express');
const projectRoutes   = express.Router();
const Project         = require('../models/project');
const Item            = require('../models/item');
const uploadCloud = require("../config/cloudinary");
const User        = require ('../models/user');


//PROJECT PAGE
projectRoutes.get('/projects', (req, res, next) => {
    Project.find({status:'open'})
    .then((projects)=>{
        res.json(projects);
    })
    .catch((err)=>{
        res.json(err);
    })
});

//SINGLE PROJECT PAGE
projectRoutes.get('/projects/:id', (req, res, Item) => {
    Project.findById(req.params.id)
    .then((response)=>{
        res.json(response);
    })
    .catch((err)=>{
        res.json(err);
    })
});

//CREATE PROJECT isLoggedIn, owner:               req.User._id,
projectRoutes.post('/projects/create',uploadCloud.single('theImage'),  (req, res, next)=>{

    Project.create({
        name:                req.body.name,
        // image:               req.file.url,
        description:         req.body.description,
        shortdescription:    req.body.shortdescription,
        

      
    })
    .then((response)=>{
        res.json(response)
    })
    .catch((err)=>{
        res.json(err);
    })
})

//UPDATE PROJECT  isLoggedIn,
projectRoutes.post('/projects/:id/update', uploadCloud.single('theImage'),  (req, res, next)=>{
    Project.findByIdAndUpdate(req.params.id, {
        name:                req.body.name,
        // image:               req.file.url,       
        description:         req.body.description,
        shortdescription:    req.body.shortdescription,
    
    })
    .then((response)=>{
        res.json(response)
    })
    .catch((err)=>{
        res.json(err);
    })
})


//DELETE PROJECT isLoggedIn, 
projectRoutes.post('/projects/:id/delete', (req, res, next)=>{
    Project.findByIdAndRemove(req.params.id)
    .then(()=>{
        res.json({message:'deleted.'})
    })
    .catch((err)=>{
        res.json(err);
    })
})


// DELETE ITEM FROM PROJECT


projectRoutes.post('/projects/:id/remove/:itemId', isLoggedIn,(req, res, next)=>{ 
    const data = {
    itemId: req.params.itemId,
    projId: req.params.id,
    remQuant: Number(req.body.remQuant),

    }
    console.log(req.body, data)
    Project.findById(data.projId)
    .then (foundProject =>{
        foundProject.inventory.forEach(oneObj=>{   // after forEach (placeholder (whatever name, it means each of the objects in array will go through thsi) => { then all else})
    
            if (oneObj.itemId.equals(data.itemId)) {
              
                const index = foundProject.inventory.indexOf(oneObj)      //to find the index of the object Array.indexOf(object) 
                    if (Number(oneObj.usedQuant - Number(data.remQuant)) === 0){
                        foundProject.inventory.splice(index, 1)
        
                        foundProject.save()
                        .then(() => {
                            
                            Item.findById(data.itemId)
                            .then(foundItem =>{
                                foundItem.quantity = Number(Number(foundItem.quantity) + Number(data.remQuant))
                                if(foundItem.status = "used"){
                                    foundItem.status = "available"
                                }
    
                                foundItem.save()
                                .then(savedItem=>{ 
                                    res.status(200).json(savedItem)
                                })
                                .catch((err)=>{res.json ({ message: 'err 1' });
                                })
                            })
                            .catch((err)=>{res.json({ message: 'err 2' });
                            })
                        })
                        .catch((err)=>{res.json({ message: 'err 3' });
                        })


                    } else {

                        oneObj.usedQuant = Number(Number(oneObj.usedQuant) - Number(data.remQuant))
                        foundProject.save()
                        .then(() =>{
                            Item.findById(data.itemId)
                            .then(foundItem =>{
                                foundItem.quantity = Number(Number(foundItem.quantity) + Number(data.remQuant))
                                if(foundItem.status = "used"){
                                    foundItem.status = "available"
                                }

                                foundItem.save()
                                .then(savedItem=>{ 
                                    res.status(200).json(savedItem)
                                })
                                .catch((err)=>{res.json({ message: 'err 4' });
                                })
                            })                   
                            .catch((err)=>{res.json({ message: 'err 5' });
                            })                           
                        })
                        .catch((err)=>{res.json({ message: 'err 6' });
                        })
                    }
            }
        })
    })
    .catch((err)=>{ console.log(err, 353463464356) ;res.json({ message: err.message });
    })      
})

function isLoggedIn(req,res,next){
    if(!req.isAuthenticated()){
        res.redirect('login')
    } 
    return next()
}


//CALCULATE PRICE OF PROJECT

// projectRoutes.post('/projects/:id/calculate', (req, res, next)=>{
//     var singleProductCost = document.getElementsByClassName('productCost');
//     var theQuantity = document.getElementsByClassName('qty');
//     var singleProductTotal = document.getElementsByClassName('totalProductPrice');
//     var realTotalPrice = document.getElementById('spanTotal');
//     var calcPricesBtn = document.getElementById('calc-prices-button');
//     var rows = document.getElementsByClassName('row');
    
    
//     calcPricesBtn.onclick = function(){
//         for(var i = 0; i < singleProductCost.length; i++){
//             var qty = theQuantity[i].value;
//             var unitCost = singleProductCost[i].innerHTML;
//             var totalItemCost = qty*unitCost
//             singleProductTotal[i].innerHTML = totalItemCost.toFixed(2);
//         }
//         var arr = [].slice.call(singleProductTotal)
//         // this line magically turns our array-like-object into an actual array
//         //so that we are now able to run a .reduce function on our array
//         var realFinalTotal = arr.reduce(function(sum, eachNumSpan){
//             return sum + Number(eachNumSpan.innerHTML);
//         },0)
//         realTotalPrice.innerHTML = realFinalTotal.toFixed(2);
//     }
    
//     document.getElementById('createBtn').onclick = function(){
//         var priceToCreate = document.getElementById('productCostValue').value;
//         var nameToCreate = document.getElementById('productNameValue').value;
//         var newRow = document.createElement('div');
//         newRow.className += 'row';
//         newRow.innerHTML = `
//         <div class="col-xs-5">
//             <span class="productName">${nameToCreate}</span>
//         </div>
//         <div class="col-xs-5">
//             $<span class="productCost">${priceToCreate}</span>
//         </div>
//         <div class="col-xs-5">
//             <label for="qty">QTY</label>
//             <input type="number" value="0" min="0" class="qty">
//         </div>
//         <div class="col-xs-5">
//             $<span class="totalProductPrice">0.00</span>
//         </div>
//         <div class="col-xs-5 delete">
//             <button class="btn btn-delete">DELETE</button>
//         </div>
//         `
//     document.getElementById('something').appendChild(newRow);
    
    
//     for(var i = 0; i < deleteButtons.length; i++){
//         deleteButtons[i].onclick= function(event){
//            event.currentTarget.parentNode.parentNode.remove();
//         }
//     }
//     }
    
    
//     for(var i = 0; i < deleteButtons.length; i++){
//         deleteButtons[i].onclick= function(event){
//            event.currentTarget.parentNode.parentNode.remove();
//         }
//     }
    
// })

module.exports = projectRoutes;



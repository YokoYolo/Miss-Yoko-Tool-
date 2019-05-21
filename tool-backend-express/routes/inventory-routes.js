const express       = require('express');
const itemRoutes    = express.Router();
const Item          = require('../models/item');
const Project       = require('../models/project');
const uploadCloud = require("../config/cloudinary")


//INVENTORY PAGE
itemRoutes.get('/inventory', (req, res, next) => {
    
    Item.find({status:'available'})
    .then((items)=>{
        res.json(items);
    })
    .catch((err)=>{
        res.json(err);
    })
});



//SINGLE ITEM PAGE
itemRoutes.get('/inventory/:id', (req, res, next) => {
    
    Item.findById(req.params.id)
    .then((response)=>{
        res.json(response);
    })
    .catch((err)=>{
        res.json(err);
    })
});


//CREATE ITEM
itemRoutes.post('/inventory/add',uploadCloud.single('theImage'), (req, res)=>{
    console.log('logged in: ', req.user)
    console.log('body: ', req.body)
    nPrice = Number(req.body.price).toFixed(2);
    tPrice = ((req.body.price)*(req.body.quantity)).toFixed(2);
    Item.create({
        title:                req.body.title,
        // type:                 req.body.type,
        // price:                nPrice,
        quantity:             Number(req.body.quantity),
        // totalPrice:           tPrice,
        // // image:                req.file.url,
        // type:                 req.body.type,
        description:          req.body.description,
        shortdescription:     req.body.shortdescription,
        // owner:                req.user._id,
        // color:                req.body.color,
        // dateOfPurchase:       req.body.dateOfPurchase,
        // placeOfPurchase:      req.body.placeOfPurchase,
        // material:             req.body.material,
        // weight:               req.body.weight,
        // size:                 req.body.size,
       
        
        
    })
    .then((response)=>{
        res.json(response)
    })
    .catch((err)=>{
        res.json(err);
    })
})

//UPDATE ITEM
itemRoutes.post('/inventory/:id/update/', uploadCloud.single('theImage'), (req, res, next)=>{
    // nPrice = Number(req.body.price).toFixed(2);
    // tPrice = ((req.body.price)*(req.body.quantity)).toFixed(2);
    Item.findByIdAndUpdate(req.params.id, {
        title:                req.body.title,
        // type:              req.body.type,
        // price:             nPrice,
        quantity:          Number(req.body.quantity),
        // totalPrice:        tPrice,
        // image:             req.file.url,
        // type:              req.body.type,
        description:       req.body.description,
        shortdescription:  req.body.shortdescription,
        // color:             req.body.color,
        // dateOfPurchase:    req.body.dateOfPurchase,
        // placeOfPurchase:   req.body.placeOfPurchase,
        // material:          req.body.material,
        // weight:            req.body.weight,
        // size:              req.body.size,
    })
    .then((response)=>{
        res.json(response)
    })
    .catch((err)=>{
        res.json(err);
    })
})


//DELETE ITEM
itemRoutes.post('/inventory/:id/delete', (req, res, next)=>{
    Item.findByIdAndRemove(req.params.id)
    .then((response)=>{
        res.json({message:'deleted.'})
    })
    .catch((err)=>{
        res.json(err);
    })
})



//ADD ITEM TO PROJECT

itemRoutes.post('/inventory/addtoproject', (req, res, next)=>{ 

    const data = {
        projId: req.body.projId,
        itemId: req.body.itemId   
    }
    const usedQ = req.body.usedQ;
    const updatedItem = false;
    console.log(data.projId)
    Project.findById(data.projId)
    .then(foundProj => {  
        if (foundProj.inventory.length > 0 ) 
        
        
        
        {     // go through Inventory list and updates info
            foundProj.inventory.forEach(oneObj=>{ 
                
                


                if (oneObj.itemId.equals(data.itemId)){
                    oneObj.usedQuant = Number(Number(oneObj.usedQuant) + Number(usedQ));
                    foundProj.save()
                    .then(()=>{
                            Item.findById(data.itemId)
                            .then(foundItem => {
                                foundItem.quantity = Number(Number(foundItem.quantity) - Number(usedQ))
                                
                                if (Number(Number(foundItem.quantity) - Number(usedQ)) === 0){
                                foundItem.status = "used";
                                }
                            
                                foundItem.save()
                                .then(savedItem=>{ 
                                    res.status(200).json(savedItem)
                                    return updatedItem = true;    
                                })
                                .catch((err)=>{res.json({ message: 'looked though project, didnt find' });
                                });
                            })
                            .catch((err)=>{res.json({ message: 'err2' });
                            });
                    }) 
                    .catch((err)=>{res.json({ message: 'err3' });
                    }) 
                } else {
                    if (updatedItem = false){
                foundProj.inventory.push({itemId: data.itemId, usedQuant: usedQ});
                foundProj.save()
                .then(() => {
                    Item.findById(data.itemId)
                    .then(foundItem => {
                        foundItem.quantity = Number(Number(foundItem.quantity) - Number(usedQ))
                        
                        if (Number(foundItem.quantity) === 0){
                            foundItem.status = "used";
                        }
                        foundItem.save()
                        .then(savedItem=>{ 
                            res.status(200).json(savedItem)})
                        .catch((err)=>{res.json({ message: 'err when saving item' }); });
                    })
                    .catch((err)=>{res.json({ message: 'err when finding quant of item' }); })
                }) 
                .catch((err)=>{res.json({ message: 'err saving prohject' });})   
            }
            }
            })  

        } else {   // pushes first added item to empty Project Inventory Array
            foundProj.inventory.push({itemId: data.itemId, usedQuant: usedQ});
            foundProj.save()
                .then(() => {
                    Item.findById(data.itemId)
                    .then(foundItem => {
                        foundItem.quantity = Number(Number(foundItem.quantity) - Number(usedQ))
                        
                        if (Number(foundItem.quantity) === 0){
                            foundItem.status = "used";
                        }
                        foundItem.save()
                        .then(savedItem=>{ 
                            res.status(200).json(savedItem)
                        })
                        .catch((err)=>{res.json({ message: 'err when in is empty with saving item' });
                        });
                    })
                    .catch((err)=>{res.json({ message: 'err when in is empty  with finding item' });
                    });
                }) 
                .catch((err)=>{res.json({ message: 'err when in is empty  saving project' });
                });
            console.log('blahh')
        }
    })
    .catch((err) => {res.json(err);
    });


})


module.exports = itemRoutes;

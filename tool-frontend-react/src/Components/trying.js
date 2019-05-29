// itemRoutes.post('/inventory/addtoproject', (req, res, next)=>{ 

//     const data = {
//         projId: req.body.projId,
//         pusheditem: req.body.item,
//         itemId: req.body.itemId   
//     }
//     const usedQ = req.body.usedQ;
//     const updatedItem = false;
//     console.log(data.projId)
//     Project.findById(data.projId)
//     .then(foundProj => {  
//         if (foundProj.inventory.length > 0 ) 
        
        
        
//         {     // go through Inventory list and updates info
//             foundProj.inventory.forEach(oneObj=>{ 
                
                


//                 if (oneObj.itemId.equals(data.itemId)){
//                     oneObj.usedQuant = Number(Number(oneObj.usedQuant) + Number(usedQ));
//                     foundProj.save()
//                     .then(()=>{
//                             Item.findById(data.itemId)
//                             .then(foundItem => {
//                                 foundItem.quantity = Number(Number(foundItem.quantity) - Number(usedQ))
                                
//                                 if (Number(Number(foundItem.quantity) - Number(usedQ)) === 0){
//                                 foundItem.status = "used";
//                                 }
                            
//                                 foundItem.save()
//                                 .then(savedItem=>{ 
//                                     res.status(200).json(savedItem)
//                                     return updatedItem = true;    
//                                 })
//                                 .catch((err)=>{res.json({ message: 'looked though project, didnt find' });
//                                 });
//                             })
//                             .catch((err)=>{res.json({ message: 'err2' });
//                             });
//                     }) 
//                     .catch((err)=>{res.json({ message: 'err3' });
//                     }) 
//                 } else {
//                     if (updatedItem = false){
//                 foundProj.inventory.push({itemId: data.itemId, usedQuant: usedQ});
//                 foundProj.save()
//                 .then(() => {
//                     Item.findById(data.itemId)
//                     .then(foundItem => {
//                         foundItem.quantity = Number(Number(foundItem.quantity) - Number(usedQ))
                        
//                         if (Number(foundItem.quantity) === 0){
//                             foundItem.status = "used";
//                         }
//                         foundItem.save()
//                         .then(savedItem=>{ 
//                             res.status(200).json(savedItem)})
//                         .catch((err)=>{res.json({ message: 'err when saving item' }); });
//                     })
//                     .catch((err)=>{res.json({ message: 'err when finding quant of item' }); })
//                 }) 
//                 .catch((err)=>{res.json({ message: 'err saving prohject' });})   
//             }
//             }
//             })  

//         } else {   // pushes first added item to empty Project Inventory Array
//             foundProj.inventory.push({itemId: data.itemId, usedQuant: usedQ});
//             foundProj.save()
//                 .then(() => {
//                     Item.findById(data.itemId)
//                     .then(foundItem => {
//                         foundItem.quantity = Number(Number(foundItem.quantity) - Number(usedQ))
                        
//                         if (Number(foundItem.quantity) === 0){
//                             foundItem.status = "used";
//                         }
//                         foundItem.save()
//                         .then(savedItem=>{ 
//                             res.status(200).json(savedItem)
//                         })
//                         .catch((err)=>{res.json({ message: 'err when in is empty with saving item' });
//                         });
//                     })
//                     .catch((err)=>{res.json({ message: 'err when in is empty  with finding item' });
//                     });
//                 }) 
//                 .catch((err)=>{res.json({ message: 'err when in is empty  saving project' });
//                 });
//             console.log('blahh')
//         }
//     })
//     .catch((err) => {res.json(err);
//     });


// })











// // itemRoutes.post('/inventory/addtoproject', (req, res, next)=>{ 

// //     const data = {
// //         projId: req.body.projId,
// //         itemId: req.body.itemId   
// //     }
// //     const usedQ = req.body.usedQ;
// //     const updatedItem = false;
// //     console.log(data.projId)
// //     Project.findById(data.projId)
// //     .then(foundProj => {  
// //         if (foundProj.inventory.length > 0 ) 
        
        
        
// //         {     // go through Inventory list and updates info
// //             foundProj.inventory.forEach(oneObj=>{ 
                
                


// //                 if (oneObj.itemId.equals(data.itemId)){
// //                     oneObj.usedQuant = Number(Number(oneObj.usedQuant) + Number(usedQ));
// //                     foundProj.save()
// //                     .then(()=>{
// //                             Item.findById(data.itemId)
// //                             .then(foundItem => {
// //                                 foundItem.quantity = Number(Number(foundItem.quantity) - Number(usedQ))
                                
// //                                 if (Number(Number(foundItem.quantity) - Number(usedQ)) === 0){
// //                                 foundItem.status = "used";
// //                                 }
                            
// //                                 foundItem.save()
// //                                 .then(savedItem=>{ 
// //                                     res.status(200).json(savedItem)
// //                                     return updatedItem = true;    
// //                                 })
// //                                 .catch((err)=>{res.json({ message: 'looked though project, didnt find' });
// //                                 });
// //                             })
// //                             .catch((err)=>{res.json({ message: 'err2' });
// //                             });
// //                     }) 
// //                     .catch((err)=>{res.json({ message: 'err3' });
// //                     }) 
// //                 } else {
// //                     if (updatedItem = false){
// //                 foundProj.inventory.push({itemId: data.itemId, usedQuant: usedQ});
// //                 foundProj.save()
// //                 .then(() => {
// //                     Item.findById(data.itemId)
// //                     .then(foundItem => {
// //                         foundItem.quantity = Number(Number(foundItem.quantity) - Number(usedQ))
                        
// //                         if (Number(foundItem.quantity) === 0){
// //                             foundItem.status = "used";
// //                         }
// //                         foundItem.save()
// //                         .then(savedItem=>{ 
// //                             res.status(200).json(savedItem)})
// //                         .catch((err)=>{res.json({ message: 'err when saving item' }); });
// //                     })
// //                     .catch((err)=>{res.json({ message: 'err when finding quant of item' }); })
// //                 }) 
// //                 .catch((err)=>{res.json({ message: 'err saving prohject' });})   
// //             }
// //             }
// //             })  

// //         } else {   // pushes first added item to empty Project Inventory Array
// //             foundProj.inventory.push({itemId: data.itemId, usedQuant: usedQ});
// //             foundProj.save()
// //                 .then(() => {
// //                     Item.findById(data.itemId)
// //                     .then(foundItem => {
// //                         foundItem.quantity = Number(Number(foundItem.quantity) - Number(usedQ))
                        
// //                         if (Number(foundItem.quantity) === 0){
// //                             foundItem.status = "used";
// //                         }
// //                         foundItem.save()
// //                         .then(savedItem=>{ 
// //                             res.status(200).json(savedItem)
// //                         })
// //                         .catch((err)=>{res.json({ message: 'err when in is empty with saving item' });
// //                         });
// //                     })
// //                     .catch((err)=>{res.json({ message: 'err when in is empty  with finding item' });
// //                     });
// //                 }) 
// //                 .catch((err)=>{res.json({ message: 'err when in is empty  saving project' });
// //                 });
// //             console.log('blahh')
// //         }
// //     })
// //     .catch((err) => {res.json(err);
// //     });


// // })

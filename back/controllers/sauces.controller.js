const Sauce = require('../models/sauces.model');
const fs = require('fs');


exports.getAllSauces = (req,res,next)=> {
    Sauce.find().then((allSauces)=>{
        res.status(200).json((allSauces))
    }).catch((error)=>{
        res.status(400).json({
            error: error
        })
    })
};


exports.getSpecificSauce = (req,res,next)=> {
    console.log(req.params.id)
    Sauce.findOne({
        _id: req.params.id
    }).then(specificSauce=>{
        res.status(200).json(specificSauce);
    }).catch((error)=>{
        res.status(404).json({
            error:error
        })
    })
};

exports.addSauce = (req,res,next)=>{
   const sauceObject = JSON.parse(req.body.sauce);
   delete sauceObject._id;
   const sauce = new Sauce({
       ...sauceObject,
       imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
   });
   sauce.save()
       .then(() => res.status(201).json({ message: 'Sauce saved successfully!' }))
       .catch(error => res.status(400).json({ error }));
}



exports.modifySauce = (req,res,next)=>{
    Sauce.findOne({ _id: req.params.id })
    .then((sauce) => {
        if (!sauce) {
            return res.status(404).json({
                error: new Error('Sauce not found!')
            });
        }
        if (sauce.userId !== req.auth.userId) {
            return res.status(403).json({
                error: new Error('403: unauthorized request')
            });
        }
        if (req.file) {
            const filename = sauce.imageUrl.split('/images/')[1];
            fs.unlink(`images/${filename}`, (error) => {
                if (error) {
                    throw error;
                }
            });
        }
        const sauceObject = req.file ?
            {
                ...JSON.parse(req.body.sauce),
                imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
            } : { ...req.body };
        Sauce.updateOne({ _id: req.params.id }, { ...sauceObject, _id: req.params.id })
            .then(() => res.status(200).json({ message: 'Sauce modified!' }))
            .catch(error => res.status(400).json({ error }));
    })
    .catch(error => res.status(500).json({ error }));
};





exports.deleteSauce = (req,res,next)=>{
      Sauce.findOne({ _id: req.params.id })
      .then((sauce) => {
          if (!sauce) {
              return res.status(404).json({
                  error: new Error('Sauce not found!')
              });
          }
          if (sauce.userId !== req.auth.userId) {
              return res.status(403).json({
                  error: new Error('403: unauthorized request')
              });
          }
          const filename = sauce.imageUrl.split('/images/')[1];
          fs.unlink(`images/${filename}`, () => {
              Sauce.deleteOne({ _id: req.params.id })
                  .then(() => res.status(200).json({ sauces }))
                  .catch(error => res.status(400).json({ error }));
          });
      })
      .catch(error => res.status(500).json({ error }));
}



exports.likedSauce = (req,res,next)=>{
    const like = req.body.like;
    const idSauce = req.params.id;
    Sauce.findOne({ _id: idSauce })
        .then(sauce => {
            const idIncluded = !sauce.usersLiked.includes(req.body.userId) && !sauce.usersDisliked.includes(req.body.userId);
            if (like === 1 && idIncluded) {
                Sauce.updateOne({ _id: idSauce }, {
                    $push: { usersLiked: req.body.userId },
                    $inc: { likes: +1 }
                })
                    .then(() => res.status(200).json({ message: 'like added!' }))
                    .catch(error => res.status(400).json({ error }));
            } else if (like === -1 && idIncluded) {
                Sauce.updateOne({ _id: idSauce }, {
                    $push: { usersDisliked: req.body.userId },
                    $inc: { dislikes: +1 }
                })
                    .then(() => res.status(200).json({ message: 'dislike added!' }))
                    .catch(error => res.status(400).json({ error }));
            } else {
                if (sauce.usersLiked.includes(req.body.userId)) {
                    Sauce.updateOne({ _id: idSauce }, {
                        $pull: { usersLiked: req.body.userId },
                        $inc: { likes: -1 }
                    })
                        .then(() => res.status(200).json({ message: 'like removed!' }))
                        .catch(error => res.status(400).json({ error }));
                } else if (sauce.usersDisliked.includes(req.body.userId)) {
                    Sauce.updateOne({ _id: idSauce }, {
                        $pull: { usersDisliked: req.body.userId },
                        $inc: { dislikes: -1 }
                    })
                        .then(() => res.status(200).json({ message: 'dislike removed!' }))
                        .catch(error => res.status(400).json({ error }));
                }
            }
        });
};

exports.deleteSauce = (req, res, next) => {
    Sauce.findOne({ _id: req.params.id })
        .then((sauce) => {
            if (!sauce) {
                return res.status(404).json({
                    error: new Error('Sauce not found!')
                });
            }
            if (sauce.userId !== req.auth.userId) {
                return res.status(403).json({
                    error: new Error('403: unauthorized request')
                });
            }
            const filename = sauce.imageUrl.split('/images/')[1];
            fs.unlink(`images/${filename}`, () => {
                Sauce.deleteOne({ _id: req.params.id })
                    .then(() => res.status(200).json({ sauces }))
                    .catch(error => res.status(400).json({ error }));
            });
        })
        .catch(error => res.status(500).json({ error }));
}
import Issue from '../models/Issue'
const router = require('express').Router();

//get all issues
router.route('').get((req, res) => {
    Issue.find((err, issues) => {
        if(err) {
            console.log(err);
        }
        else {
            res.json(issues);
        }
    });
});

//get one issue
router.route('/:id').get((req, res) => {
    Issue.findById(req.params.id, (err, issue) => {
        if(err) {
            console.log(err);
        }
        else {
            res.json(issue);
        }
    });
});

//add issue
router.route('/add').post((req, res) => {
    let issue = new Issue(req.body);
    issue.save().then(issue => {
            res.status(200).json({'issue': 'Added Success!'});
        })
        .catch(err => {
            res.status(400).send('Failed to create new issue!');
        });
});

//update issue
router.route('/update/:id').put((req, res) => {
    Issue.findById(req.params.id, (err, issue) => {
        if(!issue) {
            return next(new Error('Could not load issue!'));
        }
        else {
            issue.title = req.body.title;
            issue.responsible = req.body.responsible;
            issue.description = req.body.description;
            issue.severity = req.body.severity;
            issue.status = req.body.status;

        issue.save().then(issue => {
            res.json('Update Success!');
        })
        .catch(err => {
            res.status(400).send('Update Failed!');
        });
        }
    });

});

//delete issue
router.route('/delete/:id').delete((req, res) => {
    Issue.findByIdAndRemove({_id: req.params.id}, (err, issue) => {
        if(err) {
            res.json(err);
        }
        else {
            res.json('Remove Success!')
        }
    });
});

module.exports = router;
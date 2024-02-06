//find By id
// async (req,res)=>{
//userController.UserById)
router.get('/user/:id', auth, async (req,res)=>{
    const _id= req.params.id

    try{
        const user = await User.findById(_id)
        if(!user){
            return res.status(404).send('User Not Found')
        }
        res.send(user)
    }catch(e){
        res.status(500).send(e)
    }
})

// logout all
router.post('/user/logoutall', auth, async (req, res) => {
    try{
        //Below store empty array remove all tokens
        req.user.tokens= []
        //Save it
        await req.user.save()

        res.send("logout all tokens")
    }catch(e){
        res.status(500).send()
    }
})
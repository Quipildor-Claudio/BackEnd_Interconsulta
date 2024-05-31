var controller={
  
    test: (req, res) => {
        return res.status(200).send({
            menssage: ' Test Controller'
        });
    }
}

module.exports = controller;
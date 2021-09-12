const mongoose = require('mongoose');
const uri = "mongodb+srv://raladocueca98:raladocueca98@cluster0.hjylb.mongodb.net/Cluster0?retryWrites=true&w=majority";
mongoose.connect(uri, {
  useNewUrlParser: true,

}).then(()=>{console.log("Connectado ao banco de dados")}).catch(err=>{console.log(err)})

module.exports = mongoose
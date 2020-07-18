module.exports.home = function (req, res) {
    //render home page
    return res.render('home', {
        title: "Home"
    });
}
exports.homePage = (req, res) => {
    res.render('index');
}

exports.contact = (req, res) => {
    res.render('contact');
}

exports.about = (req, res) => {
    res.render('about');
}

exports.services = (req, res) => {
    res.render('services');
}

exports.projects = (req, res) => {
    res.render('projects');
}

exports.resumen = (req, res) => {
    res.render('C:\Users\Wilson\Desktop\Portfolio\public\pdf\Wilson_Rodriguez_resumen.pdf')
}
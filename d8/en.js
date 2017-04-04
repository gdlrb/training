(function() {
    var iwords = {};

    var v = document.getElementsByClassName("block_v");
    var b = document.getElementsByClassName("block_b");
    var i = document.getElementsByClassName("block_i");

/**
 * [getData description]
 * @return {[type]} [description]
 */
    function getData() {
        var qdata = words[Object.keys(words)[Math.floor(Math.random() * Object.keys(words).length)]];
        var qword = qdata.word;
        var qtrlt = qdata.trlt;
        i[0].innerHTML = qword;
        i[0].setAttribute("value", qtrlt);

        do {
            iwords.i1 = qtrlt;
            iwords.i2 = words[Object.keys(words)[Math.floor(Math.random() * Object.keys(words).length)]].trlt;
            iwords.i3 = words[Object.keys(words)[Math.floor(Math.random() * Object.keys(words).length)]].trlt;
            iwords.i4 = words[Object.keys(words)[Math.floor(Math.random() * Object.keys(words).length)]].trlt;
        } while (
            iwords.i1 == iwords.i2 || iwords.i1 == iwords.i3 ||
            iwords.i1 == iwords.i4 || iwords.i2 == iwords.i1 ||
            iwords.i2 == iwords.i3 || iwords.i2 == iwords.i4 ||
            iwords.i3 == iwords.i1 || iwords.i3 == iwords.i2 ||
            iwords.i3 == iwords.i4 || iwords.i4 == iwords.i1 ||
            iwords.i4 == iwords.i2 || iwords.i4 == iwords.i3
        );
        do {
            v[0].innerHTML = iwords[Object.keys(iwords)[Math.floor(Math.random() * Object.keys(iwords).length)]];
            v[1].innerHTML = iwords[Object.keys(iwords)[Math.floor(Math.random() * Object.keys(iwords).length)]];
            v[2].innerHTML = iwords[Object.keys(iwords)[Math.floor(Math.random() * Object.keys(iwords).length)]];
            v[3].innerHTML = iwords[Object.keys(iwords)[Math.floor(Math.random() * Object.keys(iwords).length)]];
        } while (
            v[0].innerHTML == v[1].innerHTML || v[0].innerHTML == v[2].innerHTML ||
            v[0].innerHTML == v[3].innerHTML || v[1].innerHTML == v[0].innerHTML ||
            v[1].innerHTML == v[2].innerHTML || v[1].innerHTML == v[3].innerHTML ||
            v[2].innerHTML == v[1].innerHTML || v[2].innerHTML == v[0].innerHTML ||
            v[2].innerHTML == v[3].innerHTML || v[3].innerHTML == v[1].innerHTML ||
            v[3].innerHTML == v[2].innerHTML || v[3].innerHTML == v[0].innerHTML
        );
        v[0].removeAttribute("style");
        v[1].removeAttribute("style");
        v[2].removeAttribute("style");
        v[3].removeAttribute("style");
    };

/**
 * [isAnswerGoood description]
 * @return {Boolean} [description]
 */
    function isAnswerGoood() {
        if (event.target.innerHTML == i[0].value) {
            event.target.setAttribute("style", "background-color:green");
        } else {
            event.target.setAttribute("style", "background-color:red");
            if (v[0].innerHTML == i[0].value) {
                v[0].setAttribute("style", "background-color:green");
            }
            if (v[1].innerHTML == i[0].value) {
                v[1].setAttribute("style", "background-color:green");
            }
            if (v[2].innerHTML == i[0].value) {
                v[2].setAttribute("style", "background-color:green");
            }
            if (v[3].innerHTML == i[0].value) {
                v[3].setAttribute("style", "background-color:green");
            }
        }
        setTimeout(getData, 1000);
    };

    getData();

    b[0].addEventListener("click", getData);

    v[0].addEventListener("click", isAnswerGoood);
    v[1].addEventListener("click", isAnswerGoood);
    v[2].addEventListener("click", isAnswerGoood);
    v[3].addEventListener("click", isAnswerGoood);
})();
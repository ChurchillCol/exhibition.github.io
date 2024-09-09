const alld = ["d1", "d2", "d3"];
const allh = ["h1", "h2", "h3"];
const allg = ["i1", "i2", "i3", "i4", "i5", "i6", "i7", "i8", "i9"];
const atts = ["artist", "decade", "location", "medium", "style"];

var currentid = ""

window.mobileCheck = function() {
    let check = false;
    (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window.opera);
    return check;
  };

const csvFilePath = './entries.csv'; //Where all the entry data is stored
let entries;
async function parse_tojson() { // parses the entry data into json format
    try {
        const response = await fetch(csvFilePath);
        const csvText = await response.text();
        const parsedData = Papa.parse(csvText, { header: true });
        entries = parsedData.data;  // Assign to global 'entries'
    } catch (err) {
        console.error('Error:', err);
    }
}

function fullimg(f) {
    let fullimg = document.getElementById("fullimage")
    let container = document.getElementById("fullimagecontainer");
    fullimg.src = f.getAttribute("src");
    container.classList.toggle("full");
    function leave() {
        container.classList.toggle("full");
    }
    container.addEventListener("click", leave, { once : true });
};

//takes arg false: disable; true: enable click
function stopstartclick(n) { 
    switch(n){
        case false: 
            document.getElementById("d0").style.pointerEvents = 'none';
            document.getElementById("d1").style.pointerEvents = 'none';
            document.getElementById("d2").style.pointerEvents = 'none';
            document.getElementById("d3").style.pointerEvents = 'none';
            break;
        case true:
            document.getElementById("d0").style.pointerEvents = 'auto';
            document.getElementById("d1").style.pointerEvents = 'auto';
            document.getElementById("d2").style.pointerEvents = 'auto';
            document.getElementById("d3").style.pointerEvents = 'auto';
            break;
        default:
            console.log('invalid argument');
            break;
    }   
};

//iterates through the list of attributes and returns nested array
//of all images which match each given att for d0 image (l)
async function matchatts (l, n) { 
    await parse_tojson();
    let attrjson = entries;
    let nextlist = {}
    for (let a=0; a < l.length; a++) {
        let thisa = l[a];
        let cands = [];
        for (let i=0; i < attrjson.length; i++) {
            if (attrjson[i][thisa] == attrjson[n][l[a]]){
                if (n !== i) {
                    cands.push(attrjson[i]["filename"]);
                }
            };
        }
        nextlist[thisa] = cands; 
    }
    return nextlist;
};


//TO FIX: CHOOSE NO DUPLICATES
async function choose (m) { //m is the filename of current main image
    
    var n = Number(m.match(/\d/g).join(""));

    let nextlist = await matchatts(atts, n); 

    let nextimglist = [];
    mixedatts = atts.sort(() => 0.5 - Math.random());
    for (let a of mixedatts) {
        if (nextlist[a].length > 0) {
            randimg = nextlist[a].sort(() => 0.5 - Math.random());
            nextimglist.push([a, randimg[0]]);
        }
    };

    let realnext = []
    for (let x=0; x < 3; x++) {
        if (nextimglist.length < 3) {
            //console.log("nextimglist too short! Pushing random images")
            for (let i=0; i<(3-nextimglist.length); i++) {
                nextimglist.push(["random image", "./Images/t"+Math.floor(Math.random()*50)+".png"]);
            };
        };
        nextimg = nextimglist[x][1];
        realnext.push(nextimg);
        let img = "sidetext"+(x+1).toString();
        let att = nextimglist[x][0];
        await parse_tojson();
        let attrjson = entries;
        let specificatt = attrjson[attrjson.findIndex(v => v.filename == m)][att];
        switch (att) {
            case 'medium':
                document.getElementById(img).innerHTML= "More: "+"&nbsp"+specificatt;
                break;
            case 'location':
                document.getElementById(img).innerHTML= "More at:  "+"&nbsp"+specificatt;
                break;
            case 'artist':
                document.getElementById(img).innerHTML= "More by: "+"&nbsp"+specificatt;
                break;
            case 'style':
                document.getElementById(img).innerHTML= "More:  "+"&nbsp"+specificatt;
                break;
            case 'decade':
                document.getElementById(img).innerHTML= "More from the:  "+"&nbsp"+specificatt;
                break;
            default:
                document.getElementById(img).innerHTML= "Wildcard!";
                break;
        }   

    }
    return realnext; 
};

function hiderest(g, l) {
    for (let i of l) {
		if (i !== g.id) {
			document.getElementById(i).classList.toggle("hidden");
		} else {}
	}
};

async function replaceimg(i, s) {
    var sideimg = document.getElementById(i);
    sideimg.src=s;
};

function transition(elem, transclass) {
    console.log("transitioning", elem, transclass)
    return new Promise((resolve, reject) => {
      function handleTransitionEnd() {
        resolve(elem);
        console.log("transitioned", elem, transclass);
      }
      elem.addEventListener("transitionend", handleTransitionEnd, { once: true });
      elem.classList.toggle(transclass);
    });
};

function transition_remove(elem, transclass) {
    console.log("transitioning", elem, transclass)
    return new Promise((resolve, reject) => {
      function handleTransitionEnd() {
        resolve(elem);
      }
      elem.addEventListener("transitionend", handleTransitionEnd, { once: true });
      elem.classList.remove(transclass);
    });
};

 // elemlist syntax [[e1, transclass1], [e2, transclass2],...]
 function transitionmultiple(elemlist) {
    return new Promise((resolve, reject) => {
        let count = 0;  
        function handleTransitionEnd() {
            count++;
            if (count === elemlist.length) {
                resolve("complete");  
            }
        }

        for (let l = 0; l < elemlist.length; l++) {
            elemlist[l][0].addEventListener("transitionend", handleTransitionEnd, { once: true });
            elemlist[l][0].classList.toggle(elemlist[l][1]);
        }
    });
};

///////////////////

/* View in fullscreen */
var elem = document.documentElement;

/* View in fullscreen with fade effect */
function openFullscreen() {
    if (elem.requestFullscreen) {
      elem.requestFullscreen();
    } else if (elem.webkitRequestFullscreen) { /* Safari */
      elem.webkitRequestFullscreen();
    } else if (elem.msRequestFullscreen) { /* IE11 */
      elem.msRequestFullscreen();
    }
}

async function getInfo(img) {
    await parse_tojson();
    let textjson = entries;
    let thisentry = textjson[textjson.findIndex(v => v.filename == img)];
    newinfo = thisentry["text"];
    newtitle = thisentry["name"];
    newartist = thisentry["artist"];
    newyear = thisentry["year"];
    return [newinfo, newtitle, newartist, newyear];
}


async function loadhome() {
    if (mobileCheck()) {
        document.getElementById("exhibitionname").innerHTML = "Sorry, Mobile browsers are not supported!";
        document.getElementById("sbf").style.visibility = "hidden";
        document.getElementById("tab1f").style.visibility = "hidden";
        document.getElementById("tab2f").style.visibility = "hidden";
        document.getElementById("tab3f").style.visibility = "hidden";
        document.getElementById("bff").style.visibility = "hidden";
        await transition_remove(document.getElementById("hb"), "hidden");
        return;
    } else {
    await transition_remove(document.getElementById("hbf"), "hidden");
    await transition_remove(document.getElementById("hb"), "hidden");
    await transition_remove(document.getElementById("h1"), "hidden");
    await transition_remove(document.getElementById("h2"), "hidden");
    await transition_remove(document.getElementById("h3"), "hidden");
    return;
    }
}

async function beginexhibition(g) {
    //disable click functionality
    stopstartclick(false);
    openFullscreen();    

    //objects to transition
    const hb = document.getElementById("hb");
    const hbf = document.getElementById("hbf");
    const htitle = document.getElementById("htitle");
    const h1 = document.getElementById("h1");
    const h2 = document.getElementById("h2");
    const h3 = document.getElementById("h3");
    const sbf = document.getElementById("sbf");
    const tab1f = document.getElementById("tab1f");
    const tab2f = document.getElementById("tab2f");
    const tab3f = document.getElementById("tab3f");
    const bff = document.getElementById("bff");
    const currentimg = g.getAttribute("src");
    const mex = document.getElementById("main-exhibition");
    const info = document.getElementById("info");
    const workname = document.getElementById("work-name");
    const artistname = document.getElementById("artist-name");
    const yearname = document.getElementById("year-name");

    startimg = g.getAttribute("src");
    let newinfoset = await getInfo(startimg); //returns [newinfo, newtitle, newartist, newyear]
    info.innerHTML = newinfoset[0];
    document.getElementById("box3").scrollTop = 0;
    workname.innerHTML = newinfoset[1];
    artistname.innerHTML = newinfoset[2];
    yearname.innerHTML = newinfoset[3];

    await transition(htitle, "hidden");
    hiderest(g, allh);
    await transition(g, "tomainimg");
    await transition(hbf, "hbftomain");
    await transition(sbf, "comein");
    await transition(tab1f, "tabin");
    await transition(tab2f, "tabin");
    await transition(tab3f, "tabin");
    await transition(bff, "comein");

    let nextset = await choose(currentimg);

    await replaceimg("d0", currentimg);
    await replaceimg("d1", nextset[0]);
    await replaceimg("d2", nextset[1]);
    await replaceimg("d3", nextset[2]); 

    //document.getElementById("main-exhibition").style.visibility="visible";
    await transition(mex, "hidden");
    document.getElementById("homepage").style.visibility="hidden";

    stopstartclick(true);

    return
}

///////////////////

let history = [];
//syntax of history: [[b0, d0, d1, d2, d3, lastclickedid, lastclickedsrc, sidetext1, sidetext2, sidetext3], [...]]

async function animd(g) {

    openFullscreen(); 

    //disable click functionality
    stopstartclick(false);

    //objects to transition
    const b0 = document.getElementById("b0");
    const d0 = document.getElementById("d0");
    const f0 = document.getElementById("f0");
    const f1 = document.getElementById("f1");
    const d1 = document.getElementById("d1");
    const d2 = document.getElementById("d2");
    const d3 = document.getElementById("d3");
    const box2 = document.getElementById("box2");
    const box3 = document.getElementById("box3");
    const sidetext1 = document.getElementById("sidetext1");
    const sidetext2 = document.getElementById("sidetext2");
    const sidetext3 = document.getElementById("sidetext3");
    const info = document.getElementById("info");
    const workname = document.getElementById("work-name");
    const artistname = document.getElementById("artist-name");
    const yearname = document.getElementById("year-name");

    history.push([b0.getAttribute("src"), d0.getAttribute("src"), 
        d1.getAttribute("src"), d2.getAttribute("src"), d3.getAttribute("src"), 
        g.getAttribute("id"), g.getAttribute("src"),
        sidetext1.innerHTML, sidetext2.innerHTML, sidetext3.innerHTML]);

    if (history.length > 200) {history.shift()};

	var thisimg = g.getAttribute("src");
    var backimg = d0.getAttribute("src");

    //set filler images
    f0.src=thisimg;
    f1.src=backimg;
   
    //transition in sequence
    await transitionmultiple([[box2, "hidden"], [box3, "hidden"]]);
    await transitionmultiple([[sidetext1, "hidden"], [sidetext2, "hidden"], [sidetext3, "hidden"]]);

    let realnext = await choose(thisimg);

     //set new info details
    let newinfoset = await getInfo(thisimg); //returns [newinfo, newtitle, newartist]
    info.innerHTML = newinfoset[0];
    box3.scrollTop = 0;
    workname.innerHTML = newinfoset[1];
    artistname.innerHTML = newinfoset[2];
    yearname.innerHTML = newinfoset[3];
    

    hiderest(g, alld); //change this function to something that takes await
    await transition(b0, "side");
    await transition(d0, "side");
    await transition(g, "main");
    
    //show filler elements
    f0.style.visibility="visible";
    f1.style.visibility="visible";

    // hide display (d) elements
    await transitionmultiple([[g, "hidden"], [d0, "hidden"], [b0, "hidden"]]);
    
    //switch to new set of images
    await replaceimg("d0", thisimg);
    await replaceimg("b0", backimg);
    await replaceimg("d1", realnext[0]);
    await replaceimg("d2", realnext[1]);
    await replaceimg("d3", realnext[2]); 

    //make info boxes visible
    await transition(box2, "hidden");
    await transition(box3, "hidden");

    //return hidden d elements to original position
    await transitionmultiple([[g, "main"], [d0, "side"], [b0, "side"]])
    await transitionmultiple([[d0, "hidden"], [b0, "hidden"]]);
   
    //make side images and text visible
    await transitionmultiple([[d1, "hidden"], [sidetext1, "hidden"]]);
    await transitionmultiple([[d2, "hidden"], [sidetext2, "hidden"]]);
    await transitionmultiple([[d3, "hidden"], [sidetext3, "hidden"]]);

    f0.style.visibility="hidden";
    f1.style.visibility="hidden";

    stopstartclick(true);

    return
};

async function goback() {

    openFullscreen(); 

    //objects to transition
    const b0 = document.getElementById("b0");
    const b1 = document.getElementById("b1");
    const d0 = document.getElementById("d0");
    const f0 = document.getElementById("f0");
    const f1 = document.getElementById("f1");
    const d1 = document.getElementById("d1");
    const d2 = document.getElementById("d2");
    const d3 = document.getElementById("d3");
    const box2 = document.getElementById("box2");
    const box3 = document.getElementById("box3");
    const sidetext1 = document.getElementById("sidetext1");
    const sidetext2 = document.getElementById("sidetext2");
    const sidetext3 = document.getElementById("sidetext3");
    const info = document.getElementById("info");
    const workname = document.getElementById("work-name");
    const artistname = document.getElementById("artist-name");
    const yearname = document.getElementById("year-name");

    let previousstate = history.pop();

    //set filler images
    f0.src=previousstate[1];
    f1.src=previousstate[0];
    document.getElementById(previousstate[5]+"-filler").src=previousstate[6];

    //further back source set
    b1.src=previousstate[0];

    //hide irrelevant elements
    await transitionmultiple([[box2, "hidden"], [box3, "hidden"], 
        [sidetext1, "hidden"], [sidetext2, "hidden"], [sidetext3, "hidden"],
        [d1, "hidden"], [d2, "hidden"], [d3, "hidden"]]);  

    //set new info details
    let newinfoset = await getInfo(previousstate[1]); //returns [newinfo, newtitle, newartist, newyear]
    box3.scrollTop = 0;
    info.innerHTML = newinfoset[0];
    workname.innerHTML = newinfoset[1];
    if (newinfoset[2] == "nil") {
        artistname.innerHTML = "";
    } else {
        artistname.innerHTML = newinfoset[2];
    }
    yearname.innerHTML = newinfoset[3];
        
    //move back to previous state
    await transition(d0, "to"+previousstate[5]);
    await transition(b0, "tomain");
    await transition(b1, "side");

    await transitionmultiple([[box2, "hidden"], [box3, "hidden"]]);

    //show filler elements
    f0.style.visibility="visible";
    f1.style.visibility="visible";
    document.getElementById(previousstate[5]+"-filler").style.visibility="visible";
    
    await transitionmultiple([[d0, "hidden"], [b0, "hidden"], [b1, "hidden"]]);
    
    await replaceimg("b0", previousstate[0]);
    await replaceimg("d0", previousstate[1]);
    await replaceimg("d1", previousstate[2]);
    await replaceimg("d2", previousstate[3]);
    await replaceimg("d3", previousstate[4]);
    sidetext1.innerHTML=previousstate[7];
    sidetext2.innerHTML=previousstate[8];
    sidetext3.innerHTML=previousstate[9];

    await transitionmultiple([[b0, "tomain"], [b1, "side"]]);
    await transition(b1, "hidden");
    await transition(d0, "to"+previousstate[5]); 
    await transition(d0, "hidden");
    
    await transitionmultiple([[d1, "hidden"], [d2, "hidden"], [d3, "hidden"], [b0, "hidden"],
        [sidetext1, "hidden"], [sidetext2, "hidden"], [sidetext3, "hidden"]]);
    
    //hide filler elements
    f0.style.visibility="hidden";
    f1.style.visibility="hidden";
    document.getElementById(previousstate[5]+"-filler").style.visibility="hidden";

    return
};

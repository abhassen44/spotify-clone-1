let currentSong = new Audio();
let songs;
let currfolder;

function getRandomBlackTint() {
    const r = Math.floor(Math.random() * 200); // Random number between 0 and 199
    const g = Math.floor(Math.random() * 200); // Random number between 0 and 199
    const b = Math.floor(Math.random() * 200); // Random number between 0 and 199
    return `rgba(${r}, ${g}, ${b}, 0.5)`; // Set opacity to 0.5
}

function continuouslyChangeColor() {
    setInterval(() => {
        const elements = document.querySelectorAll(".songlist li");
        elements.forEach(element => {
            element.style.backgroundColor = getRandomBlackTint();
        });
    }, 1000); // Change color every 2 seconds
}




function secondsToMinutesSeconds(seconds) {
    if (isNaN(seconds) || seconds < 0) {
        return "00:00";
    }

    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);

    const formattedMinutes = String(minutes).padStart(2, '0');
    const formattedSeconds = String(remainingSeconds).padStart(2, '0');

    return `${formattedMinutes}:${formattedSeconds}`;
}

async function getsongs(folder) {
    currfolder = folder;
    let a = await fetch(`/${folder}/`)
    let response = await a.text();
    let div = document.createElement("div")
    div.innerHTML = response;
    let as = div.getElementsByTagName("a")
    songs = []
    for (let index = 0; index < as.length; index++) {
        const element = as[index];
        if (element.href.endsWith(".mp3")) {
            songs.push(element.href.split(`/${folder}/`)[1])
        }
    }

    let songul = document.querySelector(".songlist").getElementsByTagName("ul")[0];
    songul.innerHTML = "";
    songs.forEach((song) => {
        songul.innerHTML += `
     <li>
     <img class="invert" src="music.svg" alt="">
     <div class="info">
         <div> ${song.replaceAll("%20", " ")}</div>
         <div>abhas</div>
     </div>
     <div class="playnow">
         <span>play now</span>
         <img class="invert" src="play.svg" alt="">
     </div>
 
     
    </li>`;
    });

    Array.from(document.querySelector(".songlist").getElementsByTagName("li")).forEach(e => {
        e.addEventListener("click", element => {

            playmusic(e.querySelector(".info").firstElementChild.innerHTML.trim());
        })


    })


    return songs;

}

const playmusic = (track, pause = false) => {
    // let audio =new Audio("/songs/"+ track);
    currentSong.src = `/${currfolder}/` + track;
    if (!pause) {
        currentSong.play();
    }
    currentSong.play();
    play.src = "pause.svg";
    document.querySelector(".songinfo").innerHTML = decodeURI(track);
    document.querySelector(".songtime").innerHTML = "00:00/00:00"
}

async function displayalbums() {
    let response = await fetch(`songs/`);
    let htmlContent = await response.text();
    let tempContainer = document.createElement("div");
    tempContainer.innerHTML = htmlContent;
    let anchors = tempContainer.getElementsByTagName("a");
    let cardcontainer = document.querySelector(".cardcontainer");  
    let array = Array.from(anchors);

    for (let i = 0; i < array.length; i++) {
        const e = array[i];
        if (e.href.includes("/songs/")) {
            let folder = e.href.split("/songs/")[1];

            // Get the meta data of the folder
            let response = await fetch(`songs/${folder}/info.json`);
            let folderInfo = await response.json();

            // Create the card element
            let card = document.createElement('div');
            card.classList.add('card');
            card.dataset.folder = folder;
            card.innerHTML = `
                <div class="play">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30 30" width="30" height="30" fill="none">
                        <circle cx="15" cy="15" r="12" stroke="black" stroke-width="1.5" fill="green" />
                        <path d="M18.6797 15.5922C18.516 16.3114 17.8796 16.8855 16.3908 17.9118C14.9425 18.894 14.1156 19.4217 13.0403 19.0819C12.2754 18.8621 11.6584 18.5457 11.211 18.1185C10.827 17.7527 10.827 16.9128 10.827 15C10.827 13.0872 10.827 12.2473 11.211 11.8815C11.6584 11.4543 12.2754 11.1379 13.0403 10.9181C14.1156 10.5783 14.9425 11.106 16.3908 12.0882C17.8796 13.1145 18.516 13.6886 18.6797 14.4078C18.7497 14.7319 18.7497 15.2681 18.6797 15.5922Z" stroke="black" stroke-width="1.5" stroke-linejoin="round" />
                    </svg>
                    
                    </div>
                    <svg class="edit" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="100" height="100" viewBox="0 0 30 30">
    <path d="M 22.828125 3 C 22.316375 3 21.804562 3.1954375 21.414062 3.5859375 L 19 6 L 24 11 L 26.414062 8.5859375 C 27.195062 7.8049375 27.195062 6.5388125 26.414062 5.7578125 L 24.242188 3.5859375 C 23.851688 3.1954375 23.339875 3 22.828125 3 z M 17 8 L 5.2597656 19.740234 C 5.2597656 19.740234 6.1775313 19.658 6.5195312 20 C 6.8615312 20.342 6.58 22.58 7 23 C 7.42 23.42 9.6438906 23.124359 9.9628906 23.443359 C 10.281891 23.762359 10.259766 24.740234 10.259766 24.740234 L 22 13 L 17 8 z M 4 23 L 3.0566406 25.671875 A 1 1 0 0 0 3 26 A 1 1 0 0 0 4 27 A 1 1 0 0 0 4.328125 26.943359 A 1 1 0 0 0 4.3378906 26.939453 L 4.3632812 26.931641 A 1 1 0 0 0 4.3691406 26.927734 L 7 26 L 5.5 24.5 L 4 23 z"></path>
</svg>
                <img src="/songs/${folder}/cover.jpg" alt="">
                <h2>${folderInfo.title}</h2>
                <p>${folderInfo.description}</p>
            `;

            // Add click event listener to the card element
            card.addEventListener('click', async () => {
                songs = await getsongs(`songs/${folder}`);
            });

            // Append the card to the card container
            cardcontainer.appendChild(card);
        }
    }


    
    Array.from(document.getElementsByClassName("card")).forEach(e => {
        e.addEventListener("click", async item => {
            songs = await getsongs(`songs/${item.currentTarget.dataset.folder}`);
            playmusic(songs[0]);

        })
    })

    Array.from(document.getElementsByClassName("card")).forEach(e => {
        e.addEventListener("mouseover", event => {
            e.style.backgroundColor = getRandomBlackTint();
           
        });
    
        e.addEventListener("mouseout", event => {
            e.style.backgroundColor = ""; // Revert to default background color
        });
    });
    
    Array.from(document.querySelectorAll(".songlist li")).forEach(item => {
        item.addEventListener("mouseover", event => {
            event.currentTarget.style.backgroundColor = getRandomBlackTint();
        });
      
        item.addEventListener("mouseout", event => {
            event.currentTarget.style.backgroundColor = ""; // Revert to default background color
        });
    });
    
    
    

  
}






async function main() {

    //get the list of all songs in directory
    await getsongs("songs/cs");
    playmusic(songs[0], true)

    //display all the albums on the page
    displayalbums();





    play.addEventListener("click", () => {
        if (currentSong.paused) {
            currentSong.play();
            play.src = "pause.svg";
        }
        else {
            currentSong.pause();
            play.src = "play.svg";
        }

    })
    currentSong.addEventListener("timeupdate", () => {
    let currentTime = currentSong.currentTime;
    let duration = currentSong.duration;
    let percent = (currentTime / duration) * 100;
    document.querySelector(".circle").style.left = `${percent}%`;
    document.querySelector(".color").style.width = `${percent}%`;
    document.querySelector(".songtime").innerHTML = `${secondsToMinutesSeconds(currentTime)}/${secondsToMinutesSeconds(duration)}`;
});
    document.querySelector(".seekbar").addEventListener("click", (e) => {
        let seekbar = document.querySelector(".seekbar");
        let percent = (e.offsetX / seekbar.offsetWidth) * 100;
        document.querySelector(".circle").style.left = percent + "%";
        document.querySelector(".color").style.width = percent + "%";
        currentSong.currentTime = (currentSong.duration * percent) / 100;
    });

    document.querySelector(".hamburger").addEventListener("click", () => {
        document.querySelector(".left").style.left = "0";

    })

    document.querySelector(".close").addEventListener("click", () => {
        document.querySelector(".left").style.left = "-120%";

    })

    document.querySelector("#previous").addEventListener("click", () => {
        currentSong.pause();
        console.log("previous");

        let index = songs.indexOf(currentSong.src.split("/").slice(-1)[0]);
        if ((index - 1) >= 0) {
            playmusic(songs[index - 1])

        }
    })

    document.querySelector("#next").addEventListener("click", () => {
        // currentSong.pause();
        console.log("next");

        let index = songs.indexOf(currentSong.src.split("/").slice(-1)[0]);

        if (index < songs.length - 1) {
            playmusic(songs[index + 1]);
        }
    })

    // console.log(document.querySelector(".range").getElementsByTagName("input")[0])
    let val;

    document.querySelector(".range").getElementsByTagName("input")[0].addEventListener("change", (e) => {
        console.log("setting volume to ", e.target.value);
        val= e.target.value;
        currentSong.volume = parseInt(e.target.value) / 100
        if(currentSong.volume>0){
            document.querySelector(".volume>img").src=document.querySelector(".volume>img").src.replace("mute.svg","volume.svg");
        }// color change is needed when bar get increased 

    })

    //load the playlist when it is clicked

 
    // add event listener to the volume icon
    document.querySelector(".volume>img").addEventListener("click", (e) => {
      
        // console.log(e.target)
        if(e.target.src.includes("volume.svg")){
         
            e.target.src= e.target.src.replace("volume.svg","mute.svg");
            currentSong.volume=0;
            document.querySelector(".range").getElementsByTagName("input")[0].value=0;
        }
        else{
            e.target.src=e.target.src.replace("mute.svg","volume.svg");
            currentSong.volume=1;
            document.querySelector(".range").getElementsByTagName("input")[0].value=val;
            console.log(val)
        }
    })

    document.querySelectorAll(".card").forEach(card => {
        card.querySelector(".edit").addEventListener("click", event => {
            event.stopPropagation(); // Prevent triggering the card click event
            let h2Element = card.querySelector("h2");
            let newTitle = alert("Enter the new folder name"); // Use prompt to get user input
    
            if (newTitle) {
                h2Element.textContent = newTitle;
    
                // Get the folder path from data attribute
                let folderPath = card.dataset.folder;
    
                // Send a request to the server to update the folder name
                fetch('/update-folder-name', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        folderPath: folderPath,
                        newTitle: newTitle
                    })
                })
                .then(response => response.json())
                .then(data => {
                    if (data.success) {
                        alert('Folder name updated successfully!');
                    } else {
                        alert('Error updating folder name.');
                    }
                })
                .catch(error => {
                    console.error('Error:', error);
                    alert('Error updating folder name.');
                });
            }
        });
    });


    document.querySelector(".search").addEventListener("submit", (e) => {
        e.preventDefault(); // Prevent the default form submission
    
        let search = document.querySelector("#search").value.toLowerCase();
        let songs = document.querySelectorAll(".songlist li");
    
        songs.forEach(song => {
            let songname = song.querySelector(".info").firstElementChild.innerHTML.toLowerCase();
            if (songname.includes(search)) {
                song.style.display = "flex";
            } else {
                song.style.display = "none";
            }
        });
    });
    
    
    



}








main();
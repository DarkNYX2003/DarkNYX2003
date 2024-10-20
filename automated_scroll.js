const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

if (SpeechRecognition) {
    const recognition = new SpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = false;
    recognition.lang = 'en-US';

    recognition.start();
    console.log('Listening...');

    function scrollOnce() {
        window.scrollBy({
            top: 600,
            behavior: 'smooth'
        });
    }

    recognition.onresult = function(event) {
        const transcript = event.results[event.results.length - 1][0].transcript.trim().toLowerCase();
        console.log('You said:', transcript);

        if (transcript === 'scroll.') {
            console.log("Scroll command received, scrolling once.");
            scrollOnce();
        } else if (transcript === 'stop.') {
            console.log("Stop command received.");
            recognition.stop();
        } else if (transcript ==='next.'){
            clickNextChapter();
        }else if(transcript === 'prev.'){
            clickPrevChapter();
        }
    };

    recognition.onend = function() {
        console.log("Speech recognition stopped.");
        
    };

    recognition.onerror = function(event) {
        console.error("Speech recognition error:", event.error);
    };

    function getCurrentChapter(){
        const chapterElement = document.querySelector('h2.text-xl.font-bold');
    
        if(chapterElement){
            const chapterText = chapterElement.textContent;
            const chapterMatch = chapterText.match(/Chapter\s+(\d+)/);
            if(chapterMatch && chapterMatch[1]){
                return parseInt(chapterMatch[1],10);
    
            }else{
                console.log("chapter not found");
                return null;
            }
        }else{
            console.log("chapter element not found")
        }
    } 
    
    
    function clickNextChapter(){
        const currentChapter = getCurrentChapter();
    
        if(currentChapter !=null){
            const nextButton = document.querySelector('a[href*="chapter/' + (currentChapter + 1) + '"] div');
            if(nextButton){
                nextButton.click();
            }else{console.log("next button not found");}
        }
    } 
    
    function clickPrevChapter(){
        const currentChapter = getCurrentChapter();
    
        if(currentChapter !=null && currentChapter>1){
            const prevButton = document.querySelector('a[href*="chapter/' + (currentChapter - 1) + '"] div');
            if(prevButton){
                prevButton.click();
            }else{console.log("prev button not found");}
        }
    } 

} else {
    console.log("Speech recognition not supported in this browser.");
}

const proxy = 'https://api.allorigins.win/raw?url=';  // Use All Origins
const SUPABASE_URL = ''; /* Paste the Supabase Project URL here */
const SUPABASE_API_KEY = ''; /* Paste the API Key for Supabase Database' */


document.getElementById('loader').style.display = 'none';

document.getElementById('add_word').addEventListener('click',function(){
    document.getElementById('loader').style.display = 'block';
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        const tabUrl = tabs[0].url;  // Gets the active tab's URL
        fetchAndExtractText(tabUrl);
        });
    });


async function fetchAndExtractText(currentUrl) {
    try{
        const response = await fetch(proxy + currentUrl);
        const html = await response.text();

        const parser = new DOMParser();
        const doc = parser.parseFromString(html, 'text/html');

        const word = doc.querySelector('.hword').textContent;
        document.getElementById('word_title').innerHTML = word.toUpperCase();

        let elements = doc.querySelectorAll('.dtText');
        let texts = Array.from(elements).map(element => element.innerText);

        //clean the extracted meanings
        for(let i=0;i<texts.length;i++){
            texts[i] = texts[i].replace(': ','');
        }

        let meaningsList = document.getElementById("meanings");
        meaningsList.innerHTML = '';


        for(let i=0;i<texts.length;i++){
            console.log(texts[i].replace(':',''));
            meaningsList.innerHTML += `<li>${texts[i].replace(':','')}</li>`;
        }

        if(!meaningsList){
            document.getElementById('loader').style.display = 'block';
        }else{
            document.getElementById('loader').style.display = 'none';
        }
        saveWord(word,texts);

    } catch (error){
        console.error('Error fetching or parsing the URL:', error);
    }
}

async function saveWord(word, texts){
    try{
        const response = await fetch(`${SUPABASE_URL}/rest/v1/words`,{
            method:"POST",
            headers: {
                'Content-Type':'application/json',
                'apiKey':SUPABASE_API_KEY,
                'Authorization':`Bearer ${SUPABASE_API_KEY}`
            },
            body: JSON.stringify({
                word: word,
                meaning: texts
            })
        });
        if (response.ok){
            let databaseStatus = document.getElementById('databaseStatus');
            databaseStatus.innerHTML = 'Word added to Supabase!';
            console.log("Word saved!");
        }else{
            const errorData = await response.json();
            console.error('Failed to save meanings:', errorData);
        }
    }catch(error){
        console.log("Error thrown: ", error);
    }
}

# WebsterSync

This Chrome extension allows you to add a particular word from Merriam Webster to a Supabase database!

## Usage
1. Create a Supabase account- assign any name for the organisation and project. 

2. In the SQL editor in Supabase, paste the following query and run it:
```
CREATE TABLE words (
  id serial PRIMARY KEY,
  word text NOT NULL,
  meaning text[] NOT NULL
);
```
3. Clone the GitHub repository
``` 
git clone https://github.com/SonakshiA/webstersync.git
``` 

4. You will find the Project URL and the API Key in the Home section of Supabase, paste those in the script.js file.

5. Paste the Project URL under the host_permissions section in the manifest.json file. 

6. Open Chrome and select the three dots on the top right corner, from the dropdown, choose the 'Extensions' tab and select 'Manage Extensions'.

7. Click on 'Load unpacked' and select the webstersync repo.

8. Navigate to any Merriam-Webster word page (e.g., https://www.merriam-webster.com/dictionary/ponder).

9. Click the extension icon to extract the word and its meaning.

10. The word and its meaning will be stored in your Supabase database.

11. You can access the stored words from the Table Editor section in Supabase. The 'words' table is present there.

## Working Demo


https://github.com/user-attachments/assets/f8a2ac8e-e953-4786-9766-20439849f8fb



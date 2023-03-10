# CPE Auto-Fill

## Install
1. 先從github上clone這個repo到您的電腦上。
   ```
    git clone 
   ```
2. 打開您的瀏覽器，並且進入擴充功能或附加元件的管理頁面。
3. 開啟開發者模式或偵錯模式，並且選擇載入未封裝或暫存的擴充功能或附加元件。
4. 瀏覽到您clone下來的repo的資料夾，並且選擇manifest.json檔案。
5. 您就會看到自動選課插件出現在您的瀏覽器工具列上了。

## How to use
1. 進入[https://cpe.cse.nsysu.edu.tw/cpe/newest](https://cpe.cse.nsysu.edu.tw/cpe/newest)
2. 選擇你要的考場
3. 你會看到報名旁會多一個"自動報名"的按鈕
4. 按下"自動報名"按鈕，插件就會開始在背景執行自動報名了。

## 注意事項
1. 請勿同時使用多個瀏覽器或裝置執行此插件，以免造成衝突或錯誤。
2. 請勿在不需要時讓此插件持續執行，以免浪費系統資源或影響其他使用者。
3. 請勿將此插件用於非法或不道德的目的，本人不負任何責任。

## 反饋與建議
如果您有任何問題、錯誤回報、功能需求或改善建議，歡迎在github上提出issue或pull request。

## Question
### content scripts run code after page load
- document.addEventListener(“DOMContentLoaded”, FUNCTION)
    
    使用document.addEventListener(“DOMContentLoaded”, FUNCTION)來添加一個事件監聽器，當網頁的DOM元素都解析完成後，就會觸發FUNCTION3。這種方式通常比較快，因為不會等待圖片和腳本等資源的載入。例如：
    ```
    // content.js
    document.addEventListener("DOMContentLoaded", function() {
    console.log("DOM fully loaded!"); // 在網頁DOM元素解析完成後執行的代碼
    });
    ```
- run_at
    
    指定content scripts要在什麼時候注入到網頁中。預設值是"document_idle"，表示在網頁完全載入完成後注入。其他可選值有"document_start"和"document_end"，分別表示在網頁開始解析和解析完成前注入。例如：
    ```
    / manifest.json
    {
    "manifest_version": 2,
    "name": "Run At Example",
    "version": "1.0",
    "description": "A browser extension that runs some code at different times.",
    "content_scripts": [
        {
        "matches": ["https://www.example.com/*"],
        "js": ["content.js"],
        // 指定要在什麼時候注入content scripts
        // 可以用run_at欄位或不用（預設值是"document_idle"）
        //"run_at": "document_start"
        //"run_at": "document_end"
        //"run_at": "document_idle"
        }
    ]
    }

    // content.js
    console.log("Hello from content script!"); // 在指定時機執行的代碼
    ```
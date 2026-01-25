// script.js

const moviesPerPage = 20; // Display 6 movies per page
let currentPage = 1;
let filteredMovies = [];

// Get movie cards and other necessary DOM elements
const movieList = document.getElementById('movie-list');
const pageNumElement = document.getElementById('page-num');
const prevPageBtn = document.getElementById('prev-page');
const nextPageBtn = document.getElementById('next-page');
const searchField = document.getElementById('search-field');
/*
const videoOverlay = document.getElementById('video-overlay');
const videoPlayer = document.getElementById('video-player');
const closeIcon = document.getElementById('close-icon');
*/

// Store the movie data in an array for easier manipulation
const movies = [
    { title: " Border 2 (2026)", image: "images/movie292.jpg", link: "    https://drive.google.com/drive/folders/1nPKhklmA30H6RBCSPIq1deWFeh-aWgJ6    " },
    { title: " Ikkis 20256 ", image: "images/movie291.jpg", link: "    https://drive.google.com/drive/folders/1xweSYHnx_tj7h1UtZN0KHS22lTA2Yjpt    " },
    { title: " Taskaree 2026 : The Smugglers", image: "images/movie290.jpg", link: "    https://drive.google.com/drive/folders/1JplfufKrG9ZsPMrLannvDy0_xBCeSkMl    " },
    { title: " Prajapati 2 Bengali 2025 ", image: "images/movie289.jpg", link: "    https://drive.google.com/drive/folders/1ZPi7XlLzs6B2YanfPWaq_CQTdy_M3UXZ    " },
    { title: " Haq (2025) ", image: "images/movie288.jpg", link: "    https://drive.google.com/drive/folders/1rPCauK-a21S4Gom9YNSMYf0OcQdg9MF6    " },
    { title: " Single Papa (2025) (Season 1) ", image: "images/movie287.jpg", link: "    https://drive.google.com/drive/folders/1fJib5m232Q97QrXiAoNtcNmNXhrbtEj0    " },
    { title: " Now You See Me Now You Dont 2025 ", image: "images/movie286.jpg", link: "    https://drive.google.com/drive/folders/1Km-uML0yTBYuNIrlkTo3C7NXQcctxvc1    " },
    { title: " The Silent Sea S1 20025 ", image: "images/movie285.jpg", link: "    https://drive.google.com/drive/folders/1heC7GAzdPmFphGQ3-db_ppkGfd4676z_    " },
    { title: " Raghu Dakat 20025 ", image: "images/movie284.jpg", link: "    https://drive.google.com/drive/folders/1zmQgrQykwamL0A6FYG4SXDWUKZhN8wt6    " },
    { title: " Aaja Nachle (2007) ", image: "images/movie283.jpg", link: "    https://drive.google.com/drive/folders/1vITmLhIiHvD02nUrSJCtadxeUFyupa20    " },
    { title: " Dhurandhar (2025) ", image: "images/movie282.jpg", link: "    https://drive.google.com/drive/folders/1vkrkoVm4a38UGZW1TvQc6Sxtd97Rdks4    " },
    { title: " Family Man S3 2025 ", image: "images/movie281.jpg", link: "    https://drive.google.com/drive/folders/1Ic7f-D09PqS0UHWahAJQjO0PASoXekMF    " },
    { title: " Tron ares 2025 ", image: "images/movie280.jpg", link: "    https://drive.google.com/drive/folders/1yZjqEMygt7e7f-3sz3pP3tEOlUL7W-14    " },
    { title: " Tehran (2025) ", image: "images/movie279.jpg", link: "    https://drive.google.com/drive/folders/1Ic6RPqyZywsbqXEaY71-AHBjMH8VH5tO    " },
    { title: " Piku 2015 ", image: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fen.wikipedia.org%2Fwiki%2FPiku&psig=AOvVaw2mk5t_0ChQpaEIZ5FYpf4P&ust=1762078602149000&source=images&cd=vfe&opi=89978449&ved=0CBUQjRxqFwoTCKDRzL7c0JADFQAAAAAdAAAAABAE", link: "    https://drive.google.com/drive/folders/1-DCE12Sgs-GG1F0rLqCMJXz-SZejUjlz    " },
    { title: " Chennai Express 2013  ", image: "https://www.google.com/imgres?q=chennai%20express&imgurl=https%3A%2F%2Fstatic.wikia.nocookie.net%2Fbollywoodmeradost%2Fimages%2F1%2F1b%2FChennai_Express.jpg%2Frevision%2Flatest%3Fcb%3D20210221144210&imgrefurl=https%3A%2F%2Fbollywoodmeradost.fandom.com%2Fwiki%2FChennai_Express&docid=2GlQTHxzzyU6cM&tbnid=zEaQDbohTeWqjM&vet=12ahUKEwiRvbad3NCQAxVqUGcHHcGALhYQM3oECBUQAA..i&w=401&h=764&hcb=2&ved=2ahUKEwiRvbad3NCQAxVqUGcHHcGALhYQM3oECBUQAA", link: "    https://drive.google.com/drive/folders/1UON2hKuE9I8fSZBC3jA6EAvGm5uKFika    " },
    { title: " Dilwale (2015) ", image: "images/movie277.jpg", link: "    https://drive.google.com/drive/folders/1m_7ymcfR_c_D_alIO9GCJg2lS-lI9zKu    " },
    { title: " The Bads of Bollywood (2025) ", image: "images/movie276.jpg", link: "    https://drive.google.com/drive/folders/1qwp1_rUEBlyhLA0c1PNxRpdbZjZohmtX    " },
    { title: " Bhagwat Chapter One Raakshas (2025) ", image: "images/movie275.jpg", link: "    https://drive.google.com/drive/folders/1EefYsstn7XzIZcGjnKZRvy6NnvaTQjc0    " },
    { title: " Kantara : A Legend Chapter 1 (2025) ", image: "images/movie274.jpg", link: "    https://drive.google.com/drive/folders/1byZkYqkshsXDQaRZypnZTz76tlKrC_Gq    " },
    { title: " Jolly LLB 3 2025 ", image: "images/movie273.jpg", link: "    https://drive.google.com/drive/folders/1qappswiDsSwtijVJBvrDig_h5UPIXndx    " },
    { title: " Sunny Sanskari Ki Tulsi Kumari (2025) ", image: "images/movie272.jpg", link: "    https://drive.google.com/drive/folders/1bi97H7LvghREKr2UTrs79DcumP2pQFP7    " },
    { title: " Beyond the bar S1 ", image: "images/movie271.jpg", link: "    https://drive.google.com/drive/folders/1i9KDUrKz8ld-uD64InX7xk92h5ylxYf-    " },
    { title: " baaghi 4 2025 ", image: "images/movie262.jpg", link: "    https://drive.google.com/drive/folders/1z3ZAaU-oTg6bBOH9LdHRJ5Fz9l53g8AB    " },
    { title: " Inspector Zende 2025 ", image: "images/movie261.jpg", link: "    https://drive.google.com/drive/folders/1wTVDFdNuqpPOfnadYPnFr3Ptpufnr9-T    " },
    { title: " Param Sundari 2025 ", image: "images/movie260.jpg", link: "    https://drive.google.com/drive/folders/14UsiEMg6VNxOQaR7RL7ljl0xAoYuwUoZ    " },
    { title: " The Bengal Files 2025 ", image: "images/movie259.jpg", link: "    https://drive.google.com/drive/folders/1gwanlc26RKYAmjAV7xtnQueRIV_F5Bqm    " },
    { title: " Vash Level 2 2025 ", image: "images/movie258.jpg", link: "    https://drive.google.com/drive/folders/1Cb4FDg6g-ONqAJRj1Ch1OsYDwWc8SYPk    " },
    { title: " Doctor Slump S1 2024 ", image: "images/movie257.jpg", link: "    https://drive.google.com/drive/folders/1n7IIPR_2XkY5Tw--pEcHv_jcU9xiwFB8    " },
    { title: " The Bad Guys 2 2025 ", image: "images/movie256.jpg", link: "    https://drive.google.com/drive/folders/1Pw-eLefQMad2IcG7691rYAwtvnv_42tm    " },
    { title: " Coolie Hindi 2025 ", image: "images/movie255.jpg", link: "    https://drive.google.com/drive/folders/1u-9H8rlWnXIC3-MQH193spyb_JnqSlrr    " },
    { title: " Dhumketu 2025 ", image: "images/movie254.jpg", link: "    https://drive.google.com/drive/folders/1ltFzo2QNLQ5J8sz3Haf6oqlTW67_PWzR    " },
    { title: " War 2 (2025) ", image: "images/movie253.jpg", link: "    https://drive.google.com/drive/folders/1_mFCj5Vc2gdquRlt44i1TzGzfeN3_STd    " },
    { title: " Materialists (2025) ", image: "images/movie252.jpg", link: "    https://drive.google.com/drive/folders/1joGy4_2LTgTcImA3nTYSNKQ-FZVGVY6h    " },
    { title: " Salakaar (2025) ", image: "images/movie251.jpg", link: "    https://drive.google.com/drive/folders/1m0_SLXLRx5KLIOAQ02e3TYHTe4OExuP2    " },
    { title: " Wednesday", image: "images/movie250.jpg", link: "    https://drive.google.com/drive/folders/1pXTLcrqGtV8lnIA2IWO7OZjqaW9fb3Vj    " },
    { title: " Connect S01 2022", image: "images/movie249.jpg", link: "    https://drive.google.com/drive/folders/1SKbkJ8wFVtSxLPnqrdtCWmQlAQIHAUX2    " },
    { title: " Jurassic World Rebirth 2025", image: "images/movie248.jpg", link: "    https://drive.google.com/drive/folders/1ecPMrgvjsEgOH2a3FgxwBw8TVIHrzZnD    " },
    { title: " When the phone rings S1 2024", image: "images/movie247.jpg", link: "    https://drive.google.com/drive/folders/1FQKSpFVssMIR5-fkcbOunvWQl10CmNDw    " },
    { title: " Son of Sardaar 2 2025", image: "images/movie246.jpg", link: "    https://drive.google.com/drive/folders/1iUPZDtJyWv2ceEk6wkaTScbjcOLQ9WfV    " },
    { title: " Head over heals S1 2025", image: "images/movie245.jpg", link: "    https://drive.google.com/drive/folders/1nBGNKXamo7yX6shXYoKXnXnrCrTvyGuc    " },
    { title: " Swades 2004", image: "images/movie244.jpg", link: "    https://drive.google.com/drive/folders/1xHb99FnQCyqHeTl7m6wtP8VURa-6A9yU    " },
    { title: " Birangana S01 Hoichoi 2025", image: "images/movie243.jpg", link: "    https://drive.google.com/drive/folders/1o69KsCAf43FSiH8o-PNaiG2dozIFzHJM    " },
    { title: " INCEPTION 2010", image: "images/movie242.jpg", link: "    https://drive.google.com/drive/folders/1FUiYLeedB9_9dbrpF0UwWhD20yAFvWPG    " },
    { title: " Dhadak 2 2025", image: "images/movie241.jpg", link: "    https://drive.google.com/drive/folders/1wSk9bqA2V_VAdoMpe3oeiHutx8C-i2yL    " },
    { title: " Mandala Murders 2025", image: "images/movie240.jpg", link: "    https://drive.google.com/drive/folders/1vOdSHKj89rzKMIMhspfzKgfO5XwYo7zA    " },
    { title: " Ghare & Baire 2018 ", image: "images/movie239.jpg", link: "    https://drive.google.com/drive/folders/1MDsDmH08AA93pp21dUIFCaL8ff0LQVRU    " },
    { title: " Killbill Society (2025) ", image: "images/movie238.jpg", link: "    https://drive.google.com/drive/folders/1uA1ebnoBioZB6g0JqeaTUsm-wUgdP5XW    " },
    { title: " Mahavatar Narsimha (2025) ", image: "images/movie237.jpg", link: "    https://drive.google.com/drive/folders/18IkpRhvvKPjrnmbdjXqd-mrC4qCZuxIo    " },
    { title: " Lilo and Stitch 2025 ", image: "images/movie236.jpg", link: "    https://drive.google.com/drive/folders/16wnUcLTPtjbB77wL1IaC27RLfGxkOMWo    " },
    { title: " Special Ops ", image: "images/movie235.jpg", link: "    https://drive.google.com/drive/folders/1Iaf1oWeXuQj19EKezJxCjD1omHaNkYVn    " },
    { title: " The Summer I Turned Pretty ", image: "images/movie234.jpg", link: "    https://drive.google.com/drive/folders/1vCEkOAwwVw3z7AC97oozi98CKpJjiRLP    " },
    { title: " Nikita Roy 2025", image: "images/movie233.jpg", link: "    https://drive.google.com/drive/folders/1H_S-VzM-z2Kn8fivdrAxYfdKwzZDq2Xr    " },
    { title: " Saiyaara 2025", image: "images/movie232.jpg", link: "    https://drive.google.com/drive/folders/1JnPiQVkt1yGvM_VEu2WIgxn7fj83vHyM    " },
    { title: " S Line Season 1 2025", image: "images/movie231.jpg", link: "    https://drive.google.com/drive/folders/19dfemTychF15yLm_VHiHPe2IuvI3jP-8    " },
    { title: " Superman 2025", image: "images/movie230.jpg", link: "    https://drive.google.com/drive/folders/1JA5OfDb5_oSs5b1NbeljiwO25KrJ6Ki8    " },
    { title: " Aap Jaisa Koi 2025 [Netflix]", image: "images/movie229.jpg", link: "    https://drive.google.com/drive/folders/11aUYOJ2eb19bEcLt-G3mZqfXWBZV-YIT    " },
    { title: " Maalik 2025 ", image: "images/movie228.jpg", link: "    https://drive.google.com/drive/folders/1eHshfFOFXGSUK3PTqa4CtBCSeM4EUHnq    " },
    { title: " Stolen 2025 [Amazon Prime]", image: "images/movie227.jpg", link: "    https://drive.google.com/drive/folders/1wBOVM_AgLISMIZMehr_J9XRWGJR88OUZ    " },
    { title: " F1 The Movie 2025", image: "images/movie269.jpg", link: "    https://drive.google.com/drive/folders/1VNGXbP0lexrfb5G_VBsQoHJB3F1AGN0j    " },
    { title: " Maa 2025", image: "images/movie270.jpg", link: "    https://drive.google.com/drive/folders/1FPixkGX-DwRi_L5RqdiKDlmF7ZeSJqzB    " },
    { title: " Metro In Dino 2025", image: "images/movie268.jpg", link: "    https://drive.google.com/drive/folders/1ckPfmIiSlWs-rhPji_uA1P2QamDOpBq5    " },
    { title: " Squid Game S03 2025", image: "images/movie267.jpg", link: "    https://drive.google.com/drive/folders/1JyDB6TWuNh7ePP2vHE4Hp1UNK9vLeBUW    " },
    { title: " Panchayat S1-S4", image: "images/movie226.jpg", link: "    https://drive.google.com/drive/folders/1Jtcd5biOwx_egLx6g5jShMUvdpgHOAJR    " },
    { title: " Sitaare Zameen Par 2025", image: "images/movie225.jpg", link: "    https://drive.google.com/drive/folders/1s9ggpe3VQ2_ux0RzOcfec9aW7SCie61e    " },
    { title: " Ballerina (From the world of John Wick) 2025", image: "images/movie224.jpg", link: "    https://drive.google.com/drive/folders/1s9cz9A9SoIplixYFF-ORugHSJMmF68yx    " },
    { title: " Before Sunrise 1995", image: "images/movie223.jpg", link: "    https://drive.google.com/drive/folders/1X0v1u9Ppk7S6r3VCavM6d2k6HopP-DUq    " },
    { title: " Criminal Justice Behind Closed Doors (2020) S2", image: "images/movie222.jpg", link: "    https://drive.google.com/drive/folders/1kZJynyAEh8iPsXf7IhTDrjoBSQUhFRcC    " },
    { title: " Criminal Justice: Adhura Sach 2022 (Season 3) ", image: "images/movie221.jpg", link: "    https://drive.google.com/drive/folders/1hS7MBImcbxxNHayoqLk7i6M1ZC19jrD-    " },
    { title: " Criminal Justice - A Family Matter (2025) Season 4 ", image: "images/movie220.jpg", link: "    https://drive.google.com/drive/folders/1dp537tECqQkwuiRFQ052VwKj3euoF0kF    " },
    { title: " Bhool Chuk Maaf 2025 ", image: "images/movie219.jpg", link: "    https://drive.google.com/drive/folders/1_RqAU2hRvaF00eHCRKs0H5moMNzI7yOZ    " },
    { title: " Mission Impossible - Final Reckoning 2025 ", image: "images/movie218.jpg", link: "    https://drive.google.com/drive/folders/1s6H_YsZjAuiJG9GHqa_jDosBRmwTyixS    " },
    { title: " Final Destination Bloodlines 2025 ", image: "images/movie217.jpg", link: "    https://drive.google.com/drive/folders/1RHmhAzmOeeoR-eysIIr-NyuctvF2xRPt    " },
    { title: " Jaat 2025 ", image: "images/movie216.jpg", link: "    https://drive.google.com/drive/folders/1nN5v-sSCFHTIjIKq7VPCGda19yZuQ1q1    " },
    { title: " Bhog S1 2025 Hoichoi ", image: "images/movie215.jpg", link: "    https://drive.google.com/drive/folders/1m_NxM-Xwlzpzs4Iw7Xr0Tgh5PsElfetA    " },
    { title: " Raid 2 2025 ", image: "images/movie214.jpg", link: "    https://drive.google.com/drive/folders/17bjY0TkD4UfzUoqBF6rhv2ZHr05M17xK    " },
    { title: " Ground Zero (2025) ", image: "images/movie213.jpg", link: "    https://drive.google.com/drive/folders/1wsYZdeVTPNIipAFMy72EGIg5Fb2NQO-A    " },
    { title: " Kesari Chapter 2 (2025) ", image: "images/movie212.jpg", link: "    https://drive.google.com/drive/folders/1Avzw4BQHTZXNEnIVFv-baxXhl6qddDIp    " },
    { title: " Jewel Thief - The Heist Begins (2025) ", image: "images/movie211.jpg", link: "    https://drive.google.com/drive/folders/1E4L8Xs1MonZRmpmccPJppQoOlWgsGCgB    " },
    { title: " Shotyi Bole Shotyi Kichhu Nei (2025) Bengali ", image: "images/movie210.jpg", link: "    https://drive.google.com/drive/folders/1WF1ddpkUvFDNY4IeV9wf5VfcktpgJTzA    " },
    { title: " The Pursuit of Happyness 2006 ", image: "images/movie209.jpg", link: "    https://drive.google.com/drive/folders/1rbxM6ZfwqVs_3-GWUikieMcvwKDWSLgA    " },
    { title: " Hidden Love 2023 ", image: "images/movie208.jpg", link: "    https://drive.google.com/drive/folders/1YaFYstSxCikhea2oPNBEunAdIRtuuqXE    " },
    { title: " The First Frost 2025 ", image: "images/movie207.jpg", link: "    https://drive.google.com/drive/folders/1krg4Qtti_P-XUZIaGhszVOASo9Ww-zh9    " },
    { title: " Buried Hearts 2025 ", image: "images/movie206.jpg", link: "    https://drive.google.com/drive/folders/1OLGiYAGzKQObS1hWt7vXKpzUckx-bQng    " },
    { title: " The Divorce Insurance 2025 ", image: "images/movie205.jpg", link: "    https://drive.google.com/drive/folders/10a0bxH8yTRfcs4qY2gu6RHitf5OiFpNN    " },
    { title: " Zakir Khan Delulu Express 2025 - AmazonPrime ", image: "images/movie204.jpg", link: "    https://drive.google.com/drive/folders/1DwpgR928qSwEdXISyRhVQzfLjmiGcG_b    " },
    { title: " Khakee The Bengal Chapter ", image: "images/movie203.jpg", link: "    https://drive.google.com/drive/folders/1N18bars9tMPHvWI4CriYqLLpSvWoEhpO    " },
    { title: " The Secret Life of Pets 2 2019 ", image: "images/movie202.jpg", link: "    https://drive.google.com/drive/folders/11XKAuuS3az18JlKkDd22tZjC61o96C6n    " },
    { title: " The Secret Life of Pets 2016 ", image: "images/movie201.jpg", link: "    https://drive.google.com/drive/folders/10I6D4p3GMmntAflt1oFXyfY2vYqjkFi0    " },
    { title: " Newtopia 2025 ", image: "images/movie200.jpg", link: "    https://drive.google.com/drive/folders/1XKccXo_Mu4n6wC7pfALHDthpJLSwMZVw    " },
    { title: " Daredevil : Born Again 2025 ", image: "images/movie199.jpg", link: "    https://drive.google.com/drive/folders/120lJ8LtodwLhircn-F5zx-PFJTJEWWAk    " },
    { title: " Undercover High School 2025 ", image: "images/movie198.jpg", link: "    https://drive.google.com/drive/folders/1vo_RYb46Q8tQKFTNmUbtTG4JvCQmLV8o    " },
    { title: " Chhaava 2025 ", image: "images/movie197.jpg", link: "    https://drive.google.com/drive/folders/1CJbGqwEA9bvxh-YQyX4N1_epiN6ajwVP    " },
    { title: " Wonderland 2024 ", image: "images/movie196.jpg", link: "    https://drive.google.com/drive/folders/1WPm-34VZ2k4OFpcwCyaCkATg6QJrTFOx    " },
    { title: " Dhoom Dhaam 2025 ", image: "images/movie195.jpg", link: "    https://drive.google.com/drive/folders/13VX4NNXsVauoMz9GD1pvx9RHtHKqjSrN    " },
    { title: " Loveyapa 2025 ", image: "images/movie194.jpg", link: "    https://drive.google.com/drive/folders/1mmKvNAlyQfXD3I06z4NmkHHwfFje4dU0    " },
    { title: " Kurup 2021 Netflix ", image: "images/movie193.jpg", link: "    https://drive.google.com/drive/folders/1nmrfYNOzu1anlBmNFJbRF0fnKx2kOF5O    " },
    { title: " Sky Force 2025 ", image: "images/movie192.jpg", link: "    https://drive.google.com/drive/folders/1rT4Y9D6Wp6Q9SBT1oijuUtz7ctITvHYV    " },
    { title: " Deva 2025 ", image: "images/movie191.jpg", link: "    https://drive.google.com/drive/folders/1uWhLwMmKF1uRFvUIxDA0H50wg4jCReO5    " },
    { title: " Mrs. Zee5 ", image: "images/movie190.jpg", link: "    https://drive.google.com/drive/folders/1ji5v94eCYR-b5-qAP7-gWzV_QvxdXaCD    " },
    { title: " BadAss RAviKumar 2025 ", image: "images/movie189.jpg", link: "    https://drive.google.com/drive/folders/1Qb1NGDwlTQG37EYz96yoLWd_mu-IPmTZ    " },
    { title: " Kaalratri S1 Hoichoi ", image: "images/movie188.jpg", link: "    https://drive.google.com/drive/folders/1pP23DzdVWmsUA1eI0c7SYRkMcSgUYjGX    " },
    { title: " Eken Babu ", image: "images/movie187.jpg", link: "    https://drive.google.com/drive/folders/1MsGd9y8s3TqK4GKel0EGyCifOefU0-94    " },
    { title: " Marco 20241 ", image: "images/movie186.jpg", link: "    https://drive.google.com/drive/folders/1C2jTTJrSO35jGXg2oMSmMC0vsi4OSVrG    " },
    { title: " Alice in Borderland ", image: "images/movie185.jpg", link: "    https://drive.google.com/drive/folders/1b2VTuE6tR8fSWMK5fq5S0imJbFaVoTvr    " },
    { title: " Squid Game S2 | Netflix ", image: "images/movie184.jpg", link: "    https://drive.google.com/drive/folders/1M_Bx3NO9mrDkC6lnupuOcgpSN4unKVPi    " },
    { title: " UI 2024 ", image: "images/movie183.jpg", link: "    https://drive.google.com/drive/folders/1hrJ-v71IVkN-vGWbesw1I8YHs3jSewUE    " },
    { title: " Baby John 2024 ", image: "images/movie182.jpg", link: "    https://drive.google.com/drive/folders/1MQe5XXfrWZmdz1b-F6UmgWeVXmEJIPn-    " },
    { title: " Feludar Goyendagiri S2 ", image: "images/movie181.jpg", link: "    https://drive.google.com/drive/folders/14GbKYfySi9PO4yZdb3OPyCwnnwYya7vp    " },
    { title: " Feludar Goyendagiri S1 ", image: "images/movie180.jpg", link: "    https://drive.google.com/drive/folders/1fJNj8JIae-1byNDT0pip3rPNrY5NfYw2    " },
    { title: " Khadaan 2024 Bengali ", image: "images/movie179.jpg", link: "    https://drive.google.com/drive/folders/1G1v4onNkC6ViNg8nA67MrTyYGzWH049C    " },
    { title: " Mismatched Season 03 2024 Netflix ", image: "images/movie178.jpg", link: "    https://drive.google.com/drive/folders/1XL0booPkx88gIoANZFnsrw28bUqt18PK    " },
    { title: " Pushpa - the rule 2024 ", image: "images/movie177.jpg", link: "    https://drive.google.com/drive/folders/11CdEBxfzpAXD9MiK7Sr7PXA_5MPsluX3    " },
    { title: " Pushpa - the rise 2024 ", image: "images/movie176.jpg", link: "    https://drive.google.com/drive/folders/1Mk2GdHhjGcndskt_clwqGN-YVu6C-z_m    " },
    { title: " Lucky Baskhar 2024 ", image: "images/movie175.jpg", link: "    https://drive.google.com/file/d/1RUk6GmKLkhx8sU9Jeqf0MEus0sYK3ZYl/view?    " },
    { title: " Seoul Busters ", image: "images/movie174.jpg", link: "    https://drive.google.com/drive/folders/1utM-FQfGihL6CZ1ZHicsYMqmyXEbN6du    " },
    { title: " Upload Series ", image: "images/movie173.jpg", link: "    https://drive.google.com/drive/folders/14T_Sy2gam2ez8mCzRs4o-iQu2VLUf1x6    " },
    { title: " Talmar Romeo Juliet Hoichoi 2024 ", image: "images/movie172.jpg", link: "    https://drive.google.com/file/d/1YJbXeVaQ6r1f_uXCL9n2KC_wl19fHeal/view    " },
    { title: " Citadel Honey Bunny S1 ", image: "images/movie171.jpg", link: "    https://drive.google.com/drive/folders/15XnVpHOJkQOj9i-A6MSYTUx6gUyQUU1k    " },
    { title: " jigra 2024 ", image: "images/movie170.jpg", link: "    https://drive.google.com/drive/folders/1XFZqvPzS2ELF0gAn9FsX3QM9h0_zw2If    " },
    { title: " Bhool Bhulaiyaa 3 2024 ", image: "images/movie169.jpg", link: "    https://drive.google.com/file/d/1JqD3UrNp0CLI_29ncLB5GGy1YTg9vUSC/view?usp=sharing    " },
    { title: " Singam Again 2024 ", image: "images/movie168.jpg", link: "    https://drive.google.com/file/d/1Lc64iJ5Z0xmbGCDKpFWT_y5sqwxheJse/view?usp=sharing    " },
    { title: " Family - The Unbreakable Bond S1 ", image: "images/movie167.jpg", link: "    https://drive.google.com/drive/folders/1q3s7zmI_ZT3fgItleDhTzuPKkueh-xLn    " },
    { title: " Do Patti 2024 - netflix ", image: "images/movie166.jpg", link: "    https://drive.google.com/file/d/1Oc_3Q_6Bc-nBANLF9_39XktGRU7NXQtV    " },
    { title: " Transformers 6: Rise of the Beasts 2023 ", image: "images/movie165.jpg", link: "    https://drive.google.com/drive/folders/12lPcNIWCZ0sNBE75xagOCuCLyTRk6IxW    " },
    { title: " Venom 3 The Last Dance 2024 ", image: "images/movie164.jpg", link: "    https://drive.google.com/drive/folders/1Ri3tfLx5Z7-VCCMoxWOQaRjEhIM1a0Cm    "},
    { title: " Venom 2 Let there be carnage 2021 ", image: "images/movie163.jpg", link: "    https://drive.google.com/drive/folders/17mXgYrSWnJvcd8FwRpDNxTFpiWuMuFwB    "},
    { title: " Venom 1 2018 ", image: "images/movie162.jpg", link: "    https://drive.google.com/drive/folders/10zCknCY3ZK0GmbsBCExOUIVPMR4AoTvS    "},
    { title: " Transformers 5: The Last Knight 2017 ", image: "images/movie161.jpg", link: "    https://drive.google.com/drive/folders/1PyTIegpa66PSnYksHVZNo84ghE_5hniW    "},
    { title: " Transformers 4: Age of Extinction 2014 ", image: "images/movie160.jpg", link: "    https://drive.google.com/drive/folders/10ZY2-0hsE30MQuun_j8ECr4heygm5VVm    "},
    { title: " Transformers 3: Dark of the Moon 2011 ", image: "images/movie159.jpg", link: "    https://drive.google.com/drive/folders/1fMA2Cqz2ELbaQjnU_5pUqdVdsfjWtnXT    "},
    { title: " Transformers 2: Revenge of the Fallen 2009 ", image: "images/movie158.jpg", link: "    https://drive.google.com/drive/folders/1r8X8ReMTvWPHwvwIO6hbBEfg-jJ1jm-1    "},
    { title: " Transformers 2007 ", image: "images/movie157.jpg", link: "    https://drive.google.com/drive/folders/1tv9ZCgcbG3jzT0ZXvKU7dcDXuPvicvOB    "},
    { title: " Khel Khel Mein 2024 ", image: "images/movie156.jpg", link: "    https://drive.google.com/drive/folders/1m_9P2LiLX37ebUpLOhc38804XuHt2u19    "},
    { title: " The Wild Robot 2024  ", image: "images/movie155.jpg", link: "    https://drive.google.com/drive/folders/1MPbqMK77qP4Yko4cy6EyTnLvNDitySFe    "},
    { title: "  Mismatched Netflix  ", image: "images/movie154.jpg", link: "    https://drive.google.com/drive/folders/1pEfgk32JcWiSET814M6khaY09rVuA1IR    "},
    { title: "	The Frog (Season 1)	", image: "images/movie153.jpg", link: "	https://drive.google.com/drive/folders/1Y6nDcWX1gGx2JbBoSjwXETbSDV2LYcai	" },
    { title: "	The Substance 2024	", image: "images/movie152.jpg", link: "	https://drive.google.com/drive/folders/14SUawCkPBGyOd-lJDEU-yC7TYfhT48qH	" },
    { title: "	Vicky Vidya ka Woh wala Video 2024 Hindi	", image: "images/movie151.jpg", link: "	https://drive.google.com/drive/folders/18ffS-M1Dr1eqpU0_-qdYwKM85quX7cXz	" },
    { title: "	Bohurupi 2024 Bengali	", image: "images/movie150.jpg", link: "	https://drive.google.com/file/d/1bn1KjlH9d4EyrKAKhRcaYG4lLaCJODqt	" },
    { title: "	Tekka 2024 Bengali	", image: "images/movie149.jpg", link: "	https://drive.google.com/drive/folders/1aO9d_LnHi6hwNGqNOLxzQjuiRy9v48yg	" },
    { title: "	Vedaa 2024	", image: "images/movie148.jpg", link: "	https://drive.google.com/drive/folders/1MYZRGLJHzikUxNtwiVGKzCLpA_5J9RUd	" },
    { title: "	Transformers One Movie 2024	", image: "images/movie147.jpg", link: "	https://drive.google.com/drive/folders/178Qsd9auq9evWZn8DMij2qXXoqFt3JX2	" },
    { title: "	Taaza Khabar 2023	", image: "images/movie146.jpg", link: "	https://drive.google.com/drive/folders/13T9R41tiqVvYyz7V-IXtNQjOf60UO21l	" },
    { title: "	Sector 36 2024	", image: "images/movie145.jpg", link: "	https://drive.google.com/drive/folders/1_X45KTBGS_CqSutq13qhNUwDf-wrCZLt	" },
    { title: "	Rabindranath Ekhane Kokhono Khete Ashenni 2021	", image: "images/movie144.jpg", link: "	https://drive.google.com/drive/folders/1k7MGA89W3Q33h36ol97sbMJH49oLeatx	" },
    { title: "	Berlin 2024 zee5	", image: "images/movie143.jpg", link: "	https://drive.google.com/drive/folders/1ZkwF2TVLHzlb5CG2aKxqKmmdlStAB0no	" },
    { title: "	It Ends with us 2024	", image: "images/movie142.jpg", link: "	https://drive.google.com/drive/folders/10GcjgwafpSEQkDtsb0lnqaYHc8Y7k2vv	" },
    { title: "	The Diary of West Bengal 2024 Hindi	", image: "images/movie141.jpg", link: "	https://drive.google.com/drive/folders/1rs4dvvmHR4o-T8yd-XY4VPXCyrW1j3o7	" },
    { title: "	Parineeta 2024 Hoichoi Season 01	", image: "images/movie140.jpg", link: "	https://drive.google.com/drive/folders/1xCKjNq8S0lfxQSTvB8ih_Q4s15aeqEOs	" },
    { title: "	Shekhar Home (2023) (Season 1)	", image: "images/movie139.jpg", link: "	https://drive.google.com/drive/folders/1rtLgPKvT_Ki5RV0TgAbfKYiNQU3UbikF	" },
    { title: "	Stree 2 Hindi 2024	", image: "images/movie138.jpg", link: "	https://drive.google.com/drive/folders/1jaaQCRfIdsyG8j8iX71zQ3GvXlEM2mig	" },
    { title: "	Chota Bheem n throne of Bali	", image: "images/movie137.jpg", link: "	https://drive.google.com/drive/folders/1FZM0rPH7aUkiHM0TPVN1Mruw5jYZSlEc	" },
    { title: "	Deadpool 3	", image: "images/movie136.jpg", link: "	https://drive.google.com/drive/folders/1ZMuH_VekaJCGBeoo5jmZSLYu89n5MhRY	" },
    { title: "	Bad Newz 2024 Hindi	", image: "images/movie135.jpg", link: "	https://drive.google.com/drive/folders/1bV2v_dJgsqNmR47ya_YzzQocB_cCbvbs	" },
    { title: "	Madgaon Express (2024)	", image: "images/movie134.jpg", link: "	https://drive.google.com/drive/folders/1hKKrCS1_1nDIfjka523yVPx6v-6hRv49	" },
    { title: "	Kill (2023) Hindi	", image: "images/movie133.jpg", link: "	https://drive.google.com/drive/folders/13ZIjyiFQ165kPBG5Vd2dImOwLVKbCmhH	" },
    { title: "	Mirzapur	", image: "images/movie132.jpg", link: "	https://drive.google.com/drive/folders/1QuRT49xYeGmSp6ejcUc-fgg-s-c793OU	" },
    { title: "	The Family Star (2024) Dual Audio {Hindi-Telugu}	", image: "images/movie131.jpg", link: "	https://drive.google.com/drive/folders/1SF-Tu7SJBthhckVSSX6w6lvfuM7Q9UFR	" },
    { title: "	Chika Gentou Gekiga Shoujo Tsubaki (1992) English Subbed  720p	", image: "images/movie130.jpg", link: "	https://drive.google.com/drive/folders/1BlmdZE616r7RbePoIM9ofnHV287lHSDe	" },
    { title: "	Shinchan--Unreleased movies	", image: "images/movie129.jpg", link: "	https://drive.google.com/drive/folders/18-YZ5wfObYEhaeNKvl7u1xCH6LN1bEyA	" },
    { title: "	Kota Factory	", image: "images/movie128.jpg", link: "	https://drive.google.com/drive/folders/1lvayebU_jPPKXzsAFzPWtWYwhII5rLL3	" },
    { title: "	Maharaj (2024)	", image: "images/movie127.jpg", link: "	https://drive.google.com/drive/folders/12Y-e_Xxfal9v65r-j-mkEF3OwBa9iQad	" },
    { title: "	Kalki 2898 AD -- 2024	", image: "images/movie126.jpg", link: "	https://drive.google.com/drive/folders/1gmRbsM2gKt1RMZCN5N2pQ2Ed9jsthrt3	" },
    { title: "	Munjya 2024	", image: "images/movie125.jpg", link: "	https://drive.google.com/drive/folders/1yIdCnxhxGwbHm-WOgafDfAFByAjw4V_n	" },
    { title: "	Ajogyo 2024 Bengali	", image: "images/movie124.jpg", link: "	https://drive.google.com/drive/folders/1UFRKj7KMQlaCt53NHi7fkWxv0KDj3Hwb	" },
    { title: "	Panchayat	", image: "images/movie123.jpg", link: "	https://drive.google.com/drive/folders/13GeJD340ToRbfpRXeU6PBt8gQczbUoF4	" },
    { title: "	Chandu Champion (2024)	", image: "images/movie122.jpg", link: "	https://drive.google.com/drive/folders/1PP18UvRC8KAYSM8ftg17B5wR6_6nn5h7	" },
    { title: "	HIT 1-2 2022 Hindi	", image: "images/movie121.jpg", link: "	https://drive.google.com/drive/folders/1FtaF6yf0ltxRN7Uq1MZvzqA2K-gEr0Qt	" },
    { title: "	Srikanth 2024 Hindi	", image: "images/movie120.jpg", link: "	https://drive.google.com/drive/folders/184vW9DdqhzbG4IhXvYUUOCJMHPsBVwTB	" },
    { title: "	Hereditary 2018	", image: "images/movie119.jpg", link: "	https://drive.google.com/drive/folders/1W9eUSC2qNW5wtbWimrBm3bebfDT1_W4c	" },
    { title: "	Heeramandi S01 netflix 2024	", image: "images/movie118.jpg", link: "	https://drive.google.com/drive/folders/1n62DPoysYjn-RzHMlumOpq3CtjVDNq_B	" },
    { title: "	YOU - Netflix Full Series	", image: "images/movie117.jpg", link: "	https://drive.google.com/drive/folders/1_KQzEc9PAaAVsK8nMKNsJ6NEvzxEwBSQ	" },
    { title: "	Amar Singh Chamkila (2024) Hindi	", image: "images/movie116.jpg", link: "	https://drive.google.com/drive/folders/13I17VXKzSwx3f_fU9tlD3DslZzQmhJJ_	" },
    { title: "	Laapataa Ladies 2023 Hindi	", image: "images/movie115.jpg", link: "	https://drive.google.com/drive/folders/1-yY5rpQGv3l7jykW4VCMVLaMvbOrypfH	" },
    { title: "	2 States 2014 Hindi	", image: "images/movie114.jpg", link: "	https://drive.google.com/drive/folders/1PcF6f8qFGdfejkomtDfat2l1oNLbdvBP	" },
    { title: "	Monkey Man - 2024	", image: "images/movie113.jpg", link: "	https://drive.google.com/drive/folders/1J8_t2ndPqFB_A3N4IDrjIKdXZ4lqVxN8	" },
    { title: "	Good Bye Earth -Netflix- 2024	", image: "images/movie112.jpg", link: "	https://drive.google.com/drive/folders/18XQuxeN4sfj_4IJpeJmGQK5Las7k8-Px	" },
    { title: "	Dead Boy Detectives - Netflix - 2024	", image: "images/movie111.jpg", link: "	https://drive.google.com/drive/folders/1bK2pmxS4OAy-BFij_B6lEOE3hBXqAm4e	" },
    { title: "	Sanam Teri Kasam 2016	", image: "images/movie110.jpg", link: "	https://drive.google.com/drive/folders/1ib--FctdiiJWoinbMXPbAdo5-1NxAGW0	" },
    { title: "	Yeh Jawaani Hain Deewani 2013	", image: "images/movie109.jpg", link: "	https://drive.google.com/drive/folders/1DgZsNyrqaWTuQC-U0Ulk5LuQfu8bSq5x	" },
    { title: "	Aamis 2019	", image: "images/movie108.jpg", link: "	https://drive.google.com/drive/folders/1XvRdGMRR_Xwitl3QjcTWxzcmEFNrzWuX	" },
    { title: "	Silence 1 Can you hear it- 2021	", image: "images/movie107.jpg", link: "	https://drive.google.com/drive/folders/1TcC9o408eBofBGI_-QssKPnJAwqNfDBi	" },
    { title: "	Luka Chuppi 2019 Hindi	", image: "images/movie106.jpg", link: "	https://drive.google.com/drive/folders/1stofsbLpoPPGmPgr8I7gYjU0SQFtqeoG	" },
    { title: "	Silence 2  the night owl bar shootout- 2024	", image: "images/movie105.jpg", link: "	https://drive.google.com/drive/folders/1y2mj3nYBG3HGmkHxV0Oqzd58rkbTis9h	" },
    { title: "	Kung Fu Panda 4 - 2024	", image: "images/movie104.jpg", link: "	https://drive.google.com/drive/folders/1Y37fZSh_fVe1oMPOo5bHhzKaD4k7jpM1	" },
    { title: "	Bhool Bhulaiyaa 2 (2022) Hindi	", image: "images/movie103.jpg", link: "	https://drive.google.com/drive/folders/1OWAVgwGzhnw-wROv32VfxLYQfuBzYS_w	" },
    { title: "	God Father 2022 (Tamil - Hindi)	", image: "images/movie102.jpg", link: "	https://drive.google.com/drive/folders/1x7rne2NH6XOeQgBeGZMK_u4wMFOgnCMx	" },
    { title: "	Maidaan (2024)	", image: "images/movie101.jpg", link: "	https://drive.google.com/drive/folders/1RDDPe9UcmeP3BqtvEzIvqZoreAhmcnmL	" },
    { title: "	Bade Miyan Chote Miyan (2024)	", image: "images/movie100.jpg", link: "	https://drive.google.com/drive/folders/1ZhRwP4AkkS_BmaW_O1a7QTbIAQWr1an1	" },
    { title: "	Parasyte 2024 - Netflix Series - English - Korean	", image: "images/movie99.jpg", link: "	https://drive.google.com/drive/folders/1lQZ-WWmUkOU4l2ho7B35ScnkuZn596YW	" },
    { title: "	ASUR - Web Series	", image: "images/movie98.jpg", link: "	https://drive.google.com/drive/folders/1L36epkjkr7b5xy4RSowwwmhNXeRU3EV-	" },
    { title: "	loki S01-S02	", image: "images/movie97.jpg", link: "	https://drive.google.com/drive/folders/1qjwnFzuV1paUbi0AdNG1Qkp7ZFD7aCMu	" },
    { title: "	Harry Potter Full Volume 2001-till	", image: "images/movie96.jpg", link: "	https://drive.google.com/drive/folders/1xKoumvEXkqswCCR9zPgbZOAdOwD66MkJ	" },
    { title: "	Crew 2024 Hindi bollywood	", image: "images/movie95.jpg", link: "	https://drive.google.com/drive/folders/1BZW996JRk-FY0452ZAbY5Vzb3q_uMvx3	" },
    { title: "	Road House 2024	", image: "images/movie94.jpg", link: "	https://drive.google.com/drive/folders/1PRvzWZpLOue8YiVt_tCh3ruw72BTczv4	" },
    { title: "	Murder Mubarak 2024 Netflix	", image: "images/movie93.jpg", link: "	https://drive.google.com/drive/folders/1rWdSVwkejPLmgdpUwgpfetcOYfX5e5qC	" },
    { title: "	Yodha 2024 Hindi	", image: "images/movie92.jpg", link: "	https://drive.google.com/drive/folders/12xYPaaTmkq9pHmRxH31Yi340EliXCsI9	" },
    { title: "	1947 EARTH 1998	", image: "images/movie91.jpg", link: "	https://drive.google.com/drive/folders/19qnGAah0z5_ai_8EJkxF-runr7EHRzmh	" },
    { title: "	Showtime (2024) (Season 1) - hindi - hotstar	", image: "images/movie90.jpg", link: "	https://drive.google.com/drive/folders/1_zERRvhl3FmG-lzKtJ_PLSYDaolQI5G6	" },
    { title: "	Shaitan 2024 Hindi	", image: "images/movie89.jpg", link: "	https://drive.google.com/drive/folders/1X5QttnocdYoJkzzpd4hdczhe3DgTdoqP	" },
    { title: "	Operation Valinetine Hindi 2024	", image: "images/movie88.jpg", link: "	https://drive.google.com/drive/folders/1qKsJX3FLcUyGteMqKf5d9Ugf2wLF9LYP	" },
    { title: "	Dune Part 1 2021	", image: "images/movie87.jpg", link: "	https://drive.google.com/drive/folders/1ijFkKhXhAQ2aOlcYeUjBLb90EG0L4TxF	" },
    { title: "	Dune Part 2 2024	", image: "images/movie86.jpg", link: "	https://drive.google.com/drive/folders/1HpCLm8dSn3AlIKyU_W8QqnI9PFcHltaH	" },
    { title: "	Midsommar 2019 [dual audio]	", image: "images/movie85.jpg", link: "	https://drive.google.com/drive/folders/16qNvEwQOGBfh3I2ksBeoiRzCd_zi-LkE	" },
    { title: "	Article 370 Hindi (2024)	", image: "images/movie84.jpg", link: "	https://drive.google.com/drive/folders/1PPew4Ui72eravTlcUajb1MJY42IohIVo	" },
    { title: "	Summertime Rendering 	", image: "images/movie83.jpg", link: "	https://drive.google.com/drive/folders/1g9RL1J9IDOiCu7ZufDDs6O93QbwWguo4	" },
    { title: "	Uri-The Surgical Strike 2019	", image: "images/movie82.jpg", link: "	https://drive.google.com/drive/folders/1xoHE0vBawHsAdefJ0wtcbOj038fHf9qC	" },
    { title: "	Deadpool 2 2018	", image: "images/movie81.jpg", link: "	https://drive.google.com/drive/folders/1-n-bjBZxTu5Uz4FHa_B_uhpmYLOqvDHU	" },
    { title: "	Deadpool 2016	", image: "images/movie80.jpg", link: "	https://drive.google.com/drive/folders/1-umKpV_BOqQ139Ge4cMcKknAmCOcX8nw	" },
    { title: "	Afwaah (2023) Hindi Movie	", image: "images/movie79.jpg", link: "	https://drive.google.com/drive/folders/1QnI6MCJAbDSdKa1nCJ9FWAjDImUAsrZu	" },
    { title: "	Teri Baaton Mein Aisa Uljha Jiya (2024) Hindi	", image: "images/movie78.jpg", link: "	https://drive.google.com/drive/folders/1_IW8W3HziemaaFeO1vrSgkrrCngvmGTZ	" },
    { title: "	A Killer Paradox (2024) - korean-english	", image: "images/movie77.jpg", link: "	https://drive.google.com/drive/folders/10eyzFDvNkwf8ltASsKWe0zk0P1iwwPBj	" },
    { title: "	IB71 Hind 2023	", image: "images/movie76.jpg", link: "	https://drive.google.com/drive/folders/1nv6mvl4-dlXXeYu-AT2AhYfDQ4iajJ8J	" },
    { title: "	Pradhan 2024	", image: "images/movie75.jpg", link: "	https://drive.google.com/drive/folders/1RwwAFv47_gVzbplinSkKrAadXVNEVO0s	" },
    { title: "	Gumraah 2023 Hindi	", image: "images/movie74.jpg", link: "	https://drive.google.com/drive/folders/1lPLzFefWkRaKZSit2GY73d1IBINp4tER	" },
    { title: "	Fighter 2023 Hindi	", image: "images/movie73.jpg", link: "	https://drive.google.com/drive/folders/1XH1vMNz16ge39vVHH9pIKbhIHKB9_4r2	" },
    { title: "	Friends	", image: "images/movie72.jpg", link: "	https://drive.google.com/drive/folders/1tHEwTW_b231HSBdCp2LUc6MRllfju_5y	" },
    { title: "	Indian Police Force S01	", image: "images/movie71.jpg", link: "	https://drive.google.com/drive/folders/1L7tDdhY7LQ-SXYlIZTroFvGtQ-V0qUU1	" },
    { title: "	Merry Christmas 2024	", image: "images/movie70.jpg", link: "	https://drive.google.com/drive/folders/1ZQr0675NcX6PfCql7ZRS4IAyqYVUspit	" },
    { title: "	My Demon 2023	", image: "images/movie69.jpg", link: "	https://drive.google.com/drive/folders/1qXhLthlZ9hgYSE65TtD-eI1r1XiBTiVA	" },
    { title: "	Death's Game 2023 - netflix	", image: "images/movie68.jpg", link: "	https://drive.google.com/drive/folders/1yuh2c2P_Nv86F_O1YBXOqnJNNNMg84x2	" },
    { title: "	Killer Soup 2023	", image: "images/movie67.jpg", link: "	https://drive.google.com/drive/folders/1jGgNjgqkvJDzaLe4uxwjW7Wq_A4gHCXG	" },
    { title: "	Scam 1992	", image: "images/movie66.jpg", link: "	https://drive.google.com/drive/folders/1FEKvrrRLGV0dxFIv-b9tEJwpBjDNtyHF	" },
    { title: "	Mission Raniganj 2023	", image: "images/movie65.jpg", link: "	https://drive.google.com/drive/folders/18_6n_qpMHg-mtynBKLz0VXlIKP4Tsi5v	" },
    { title: "	Strangers from hell 2023	", image: "images/movie64.jpg", link: "	https://drive.google.com/drive/folders/1326OJ9AjN4QRlRCutVqAiIA8Gv-G-aAP	" },
    { title: "	12th Fail 2023	", image: "images/movie63.jpg", link: "	https://drive.google.com/drive/folders/1zy4P5HlLzZUHfUnTmbOPVpMN6mDaiqun	" },
    { title: "	Kho Gaye Hum Kahan 2023	", image: "images/movie62.jpg", link: "	https://drive.google.com/drive/folders/1M49UEXGQ-zxyO8z4i9dqHwacrtG5MsHM	" },
    { title: "	Flames	", image: "images/movie61.jpg", link: "	https://drive.google.com/drive/folders/129AJUgd-bl6xaUrHK9aAhRPlobGF5ySm	" },
    { title: "	The Kerala Story	", image: "images/movie60.jpg", link: "	https://drive.google.com/drive/folders/1yvYKMYrEQufshRpdcL3AGUwlE9qZWjf8	" },
    { title: "	Salaar 2023	", image: "images/movie59.jpg", link: "	https://drive.google.com/drive/folders/1IxdHF3GWM7MY7FsJwj0PpGyMGEp4MeBe	" },
    { title: "	Dunki 2023	", image: "images/movie58.jpg", link: "	https://drive.google.com/drive/folders/1HzfJRS-MiST8agUg6Z3U0q4XVAK-PqTG	" },
    { title: "	Zakir Khan - Mann Pasand 2023 [amazon prime]	", image: "images/movie57.jpg", link: "	https://drive.google.com/drive/folders/1hA6nveVjVntSqYzaEqjuJK1d68RBGmQP	" },
    { title: "	The Archies 2023 [Netflix]	", image: "images/movie56.jpg", link: "	https://drive.google.com/drive/folders/104yYmcbHr_cAz4tpF0szfGmgFJIwfeFZ	" },
    { title: "	Leo 2023 - hindi	", image: "images/movie55.jpg", link: "	https://drive.google.com/drive/folders/1q7cJThJT-rRB0olUEtN-P9li1MNrtyrB	" },
    { title: "	Sam Bahadur 2023	", image: "images/movie54.jpg", link: "	https://drive.google.com/drive/folders/14cd0k1lP6FocWUowUjxnOInnVnXJ4TCP	" },
    { title: "	Rockstar 2011	", image: "images/movie53.jpg", link: "	https://drive.google.com/drive/folders/1xEG-u8l9RSkpmm1WdVAKDmUKb6vQFTDl	" },
    { title: "	Abhisapto 2023 (adda times)	", image: "images/movie52.jpg", link: "	https://drive.google.com/drive/folders/1UG0VHhKtBcuDp1BmPGdtniybqvACOoAG	" },
    { title: "	Animal 2023 Hindi 720p	", image: "images/movie51.jpg", link: "	https://drive.google.com/drive/folders/1VoLZVsGzYmLTNhB0UumM7MZFXbt9T-tb	" },
    { title: "	Scott Pilgrim Takes Off 2023 (Netflix)	", image: "images/movie50.jpg", link: "	https://drive.google.com/drive/folders/1Zv5FtRKvbtmDL4iKOeOULtIOwSEfcMO_	" },
    { title: "	Holy Faak (Hoichoi) (2017-)	", image: "images/movie49.jpg", link: "	https://drive.google.com/drive/folders/1kcd7j_5zqtjFUXg_7MozAv-yHoFWuj5L	" },
    { title: "	Parnashavarir Shaap 2023 (hoichoi )Bengali S01	", image: "images/movie48.jpg", link: "	https://drive.google.com/drive/folders/1ajtpNTKy4FyFxTDAlZ793ywefI828dnR	" },
    { title: "	The Railway Men - The Untold Story of Bhopal 1984 (2023)	", image: "images/movie47.jpg", link: "	https://drive.google.com/drive/folders/16drnWjjHXGpggdL172s8tdpiSP88UTP_	" },
    { title: "	The King’s Man  blood origin 2021	", image: "images/movie46.jpg", link: "	https://drive.google.com/drive/folders/1lXeyFsuvrt9VbAwh5C_H3Gl1NDCWCUuN	" },
    { title: "	Chor Nikal Ke Bhaga 2023	", image: "images/movie45.jpg", link: "	https://drive.google.com/drive/folders/1HNFBPZGWGcVpPZMBDdwZZxakRyEes_WT	" },
    { title: "	Action Replayy (2010)	", image: "images/movie44.jpg", link: "	https://drive.google.com/drive/folders/1knER3XsspeK7-pYWfouodNU_kTpYBfZa	" },
    { title: "	Sunflower 2021	", image: "images/movie43.jpg", link: "	https://drive.google.com/drive/folders/1mrR7POSt6Xf8C5x9KqSitLzX8b8PpDvc	" },
    { title: "	The Xpose 2014	", image: "images/movie42.jpg", link: "	https://drive.google.com/drive/folders/1Okui2HCZ5AY3U61Ncg93EeeByYChKLbP	" },
    { title: "	Thank You 2011	", image: "images/movie41.jpg", link: "	https://drive.google.com/drive/folders/1rLahGOcp0_68YR825YLIBzPiyKFgwqgf	" },
    { title: "	Kakababur Protyaborton (2022) 1080P	", image: "images/movie40.jpg", link: "	https://drive.google.com/drive/folders/1U0Yyt3qfU_szS3_Q1ydc2qRZ4Kw_niZz	" },
    { title: "	Taranath Tantrik (Hoichoi)	", image: "images/movie39.jpg", link: "	https://drive.google.com/drive/folders/18AirBrrzRXcqw9wYSHwqsYh489jM6f7r	" },
    { title: "	Kaala Paani 2023	", image: "images/movie38.jpg", link: "	https://drive.google.com/drive/folders/1g7BBxuTRKE4roVeg1reuB_pwAUP3whC5	" },
    { title: "	Jailer 2023	", image: "images/movie37.jpg", link: "	https://drive.google.com/drive/folders/1QEtmFl_DH85WTWrbmnkxzRBCyh7z7Ymt	" },
    { title: "	Yaadhum Oore Yaavarum Kelir 2023	", image: "images/movie36.jpg", link: "	https://drive.google.com/drive/folders/1bfXg0w4B8MIiSuDsDxgMnJK82oo0vwvC	" },
    { title: "	Fatafati 2023 Bengali	", image: "images/movie35.jpg", link: "	https://drive.google.com/drive/folders/1c1epfksXXP37M07hBXUC1_7ip5QREfbT	" },
    { title: "	BTS Yet to Come in Cinemas 2023	", image: "images/movie34.jpg", link: "	https://drive.google.com/drive/folders/1HH7P4T8MsYLQeEeqUaIbLMtQiQmlRbu5	" },
    { title: "	Tiger 3 2023	", image: "images/movie33.jpg", link: "	https://drive.google.com/drive/folders/1QpgGS5iFJqTups2CBWSzMzgsfxnGEB2v	" },
    { title: "	The Night Manager (2023) Hindi 720p	", image: "images/movie32.jpg", link: "	https://drive.google.com/drive/folders/1Y2wz4II8yhICDEHgXnjZGX9FdSVPVsib	" },
    { title: "	Death on the Nile 2022	", image: "images/movie31.jpg", link: "	https://drive.google.com/drive/folders/1cKp5lpn1aKtIh8-qjsR2mllPYPIkjRdk	" },
    { title: "	Jawan 2023 Extended Cut 1080	", image: "images/movie30.jpg", link: "	https://drive.google.com/drive/folders/1sG1rNbk_VhMcIS5cRPkx44JFuOv3LCaA	" },
    { title: "	A Haunting in Venice 2023	", image: "images/movie29.jpg", link: "	https://drive.google.com/drive/folders/1DmcUlsAQfw3Y4BTQDCofxor-qbYwARwa	" },
    { title: "	Mission Impossible Dead Rekoning Part 01 2023	", image: "images/movie28.jpg", link: "	https://drive.google.com/drive/folders/1hy6c9j_HzaP4VPHa7qVFtWmyNp1TV6ys	" },
    { title: "	Raktabeej Bengali 2023	", image: "images/movie27.jpg", link: "	https://drive.google.com/drive/folders/11hPlY-cdSkxaDE-JEPVB3dI5GPB2uLZw	" },
    { title: "	Gen V 2023	", image: "images/movie26.jpg", link: "	https://drive.google.com/drive/folders/1urU-aavIE7R4yGAMryIvxtuWyanikCg1	" },
    { title: "	Dwitiyo Purush (AvilashB) Bengali 1080p	", image: "images/movie25.jpg", link: "	https://drive.google.com/drive/folders/1FTRlsV3dhFUzliVpqWjLo2MlTGUESjn5	" },
    { title: "	Byomkesh o Durgo Rahashya 2023	", image: "images/movie24.jpg", link: "	https://drive.google.com/drive/folders/1eorobFomrbYRgEuy1SBDvxdisSV-h6IM	" },
    { title: "	Jongole Mitin Mashi 2023	", image: "images/movie23.jpg", link: "	https://drive.google.com/drive/folders/165bl4Whzv4krwxMMyaDbEfkjPYjoUtaj	" },
    { title: "	The Night Manager (2023) Hindi 720p	", image: "images/movie22.jpg", link: "	https://drive.google.com/drive/folders/1HshjpdtvlTlwcd8SGCDQe4l8tZfp3QNz	" },
    { title: "	The Boys - Amazon Prime 	", image: "images/movie21.jpg", link: "	https://drive.google.com/drive/folders/18lDQNpq3_pWj-ljbuwXf3RBolftIeNWL	" },
    { title: "	Ballarina 2023 Netflix	", image: "images/movie20.jpg", link: "	https://drive.google.com/drive/folders/1c0rKEKmuDHnb2szpR85v3yboOhbd1JJ8	" },
    { title: "	Bagha Jatin 2023	", image: "images/movie19.jpg", link: "	https://drive.google.com/drive/folders/1RZaK4YOYjGJSlSFQSf_g02uou-zTgf5u	" },
    { title: "	Kochikame.All.Episodes.Hindi.720p.x264	", image: "images/movie18.jpg", link: "	https://drive.google.com/drive/folders/1DBDmPmUh9fFg7aB1DTxkyUa8o8KRkNAg	" },
    { title: "	Catch me If you Can 2002	", image: "images/movie17.jpg", link: "	https://drive.google.com/drive/folders/1eVD7ssSRUV9G7SkgFZETWxLEWvWElWS-	" },
    { title: "	Dwitiyo Purush (AvilashB) Bengali 1080p	", image: "images/movie16.jpg", link: "	https://drive.google.com/drive/folders/1wRNfv0AkMBS81FYpsfC-ddgxPThiULrP	" },
    { title: "	Baishe Srabon (AvilashB) Bengali 720p	", image: "images/movie15.jpg", link: "	https://drive.google.com/drive/folders/1yVmFCEljq3JsUGhdP3PckFmavWiVmRdN	" },
    { title: "	Dasham Abotar 2023	", image: "images/movie14.jpg", link: "	https://drive.google.com/drive/folders/10NwHNsSn1HTVXgiSez-LkIrLfFhWlB8P	" },
    { title: "	The Flash 2023	", image: "images/movie13.jpg", link: "	https://drive.google.com/drive/folders/10db-K8aZc-ZlpICzGEy-3iizVdofXip3	" },
    { title: "	Spider-Man Across The Spider-Verse (2023) 720p WEBRip-LAMA	", image: "images/movie12.jpg", link: "	https://drive.google.com/drive/folders/1ApAo0dAp-mHORY8ChCqYAHIITc1JWBOr	" },
    { title: "	farzi	", image: "images/movie11.jpg", link: "	https://drive.google.com/drive/folders/1FieLG6_cPvR4lPGnJC3qaVjuOrWQVp2I	" },
    { title: "	Dream Girl 2 (2023) Hindi 720p WEBRip x264 AAC ESub.mkv	", image: "images/movie10.jpg", link: "	https://drive.google.com/drive/folders/1h3x8gy_ZKHtG-VFDL1DwbghMxeFKjrCZ	" },
    { title: "	Character 2021 1080p Japanese BluRay HEVC x265 5.1 BONE.mkv	", image: "images/movie9.jpg", link: "	https://drive.google.com/drive/folders/1jG8LJ_SBvX6mryv7aYMokYAmRa-RGpgy	" },
    { title: "	suzume	", image: "images/movie8.jpg", link: "	https://drive.google.com/drive/folders/1HDlRqDvPAjuQiI6-uRbK1nGJfi95DHkf	" },
    { title: "	secret invasion 2023	", image: "images/movie7.jpg", link: "	https://drive.google.com/drive/folders/16QQZm7QRS0prDEv-sJ2zn8kDEtKS6uOx	" },
    { title: "	Bloody Daddy 2023	", image: "images/movie6.jpg", link: "	https://drive.google.com/drive/folders/1DDE3BmCNy99OoEXH7759nFc1f2CcAgV8	" },
    { title: "	Rocky aur Rani ki prem kahani 2023	", image: "images/movie5.jpg", link: "	https://drive.google.com/drive/folders/1j6-CudGS7cFHvaQBV_1tGKcZn2yWb32v	" },
    { title: "	Abar Proloy 2023 S01	", image: "images/movie4.jpg", link: "	https://drive.google.com/drive/folders/1-cGzBfgg9ddZEwO13hFUFJgQZ8jjrBCE	" },
    { title: "	Guns & Gulaabs 2023 S01	", image: "images/movie3.jpg", link: "	https://drive.google.com/drive/folders/1A-3dTiu5HDP5qvMrV-9DdgH11G9p0kPW	" },
    { title: "	The Nun 2 2023	", image: "images/movie2.jpg", link: "	https://1024terabox.com/s/1AZp3dMpc6XdDBAXjpEIQlA	" },
    { title: "	OMG 2 (2023) Hindi 720p HQ HD	", image: "images/movie1.jpg", link: "	https://1024terabox.com/s/1NtQux5KUbe0Ry_NLWZgbmA	" }
];

// Pagination Functionality

function displayMovies(page = 1) {
    // Clear the current movie list
    movieList.innerHTML = '';

    // Calculate the starting and ending indices for the current page
    const startIndex = (page - 1) * moviesPerPage;
    const endIndex = Math.min(startIndex + moviesPerPage, filteredMovies.length);

    // Create movie cards for the current page
    for (let i = startIndex; i < endIndex; i++) {
        const movie = filteredMovies[i];
        const movieCard = `
            <div class="movie-card" style="border: 2px solid rgb(255, 87, 34);">
                <a href="${movie.link}" target="_blank">
                    <img src="${movie.image}" alt="${movie.title}">
                    <div class="movie-title">${movie.title}</div>
                </a>
            </div>
        `;
        movieList.innerHTML += movieCard;
    }

    // Update pagination display
    pageNumElement.textContent = page;
    prevPageBtn.disabled = page === 1;
    nextPageBtn.disabled = page === Math.ceil(filteredMovies.length / moviesPerPage);
}

// Initial load
filteredMovies = [...movies]; // Initially show all movies
displayMovies();

// Pagination Button Event Listeners
prevPageBtn.addEventListener('click', () => {
    if (currentPage > 1) {
        currentPage--;
        displayMovies(currentPage);
    }
});

nextPageBtn.addEventListener('click', () => {
    if (currentPage < Math.ceil(filteredMovies.length / moviesPerPage)) {
        currentPage++;
        displayMovies(currentPage);
    }
});

// Search Functionality

searchField.addEventListener('input', (e) => {
    const query = e.target.value.toLowerCase();

    // Filter movies based on the search query
    filteredMovies = movies.filter(movie => movie.title.toLowerCase().includes(query));

    // Reset to the first page and display the filtered results
    currentPage = 1;
    displayMovies(currentPage);
});

// for the feedback form floating button 
document.addEventListener('DOMContentLoaded', function() {
    const feedbackBubble = document.getElementById('feedback-bubble');
    const feedbackOverlay = document.getElementById('feedback-overlay');
    const minimizeIcon = document.getElementById('minimize-icon');
    const sendBtn = document.getElementById('send-btn');
    const feedbackMessage = document.getElementById('feedback-message');
    const feedbackForm = document.getElementById('feedback-form');
    const movieList = document.getElementById('movie-list');

    /*--------for mp4 media player--------*//*
    const videoPlayerOverlay = document.getElementById('video-player-overlay');
    const closeVideo = document.getElementById('close-video');
    const videoPlayer = document.getElementById('video-player');
    const videoSource = document.getElementById('video-source');
    /*--------for mp4 media player--------*/

    feedbackBubble.addEventListener('click', function() {
        feedbackOverlay.style.display = 'flex';
    });

    minimizeIcon.addEventListener('click', function() {
        feedbackOverlay.style.display = 'none';
    });

    /* when form is actually not submitting */
    /*
    sendBtn.addEventListener('click', function(event) {
        event.preventDefault(); // Prevent actual form submission
        feedbackMessage.style.display = 'block'; // Show success message
        setTimeout(() => {
            feedbackMessage.style.display = 'none'; // Hide message after 3 seconds
        }, 3000);
        document.getElementById('name').value = ''; // Clear the form fields
        document.getElementById('email').value = '';
        document.getElementById('suggestion').value = '';
    });
    */
    // Send feedback when the send button is clicked
    sendBtn.addEventListener('click', function(event) {
        event.preventDefault(); // Prevent form submission behavior

        // Get input values from the form fields
        const name = document.getElementById('name-input').value;
        const email = document.getElementById('email-input').value;
        const suggestion = document.getElementById('suggestion-input').value;

        // Check if any input is empty
        if (!name || !email || !suggestion) {
            feedbackMessage.style.display = 'block';
            feedbackMessage.textContent = 'Please fill out all fields.';
            feedbackMessage.style.color = 'red';
            return;
        }

        // Sending data to Google Apps Script Web App
        fetch('https://script.google.com/macros/s/AKfycbxpHy7dowLHk2VCVdqo0Cq5v5Zm6bO_IyIIICJchOs/dev', {
            method: 'POST',
            mode: 'cors',
            body: JSON.stringify({ name, email, suggestion }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => response.json())
        .then(data => {
            if (data.result === 'success') {
                // Display success message
                feedbackMessage.style.display = 'block';
                feedbackMessage.textContent = 'Feedback sent successfully';
                feedbackMessage.style.color = 'green';

                // Clear form fields after submission
                document.getElementById('name-input').value = '';
                document.getElementById('email-input').value = '';
                document.getElementById('suggestion-input').value = '';

                // Hide message after 3 seconds
                setTimeout(() => {
                    feedbackMessage.style.display = 'none';
                }, 3000);
            } else {
                throw new Error(data.error);
            }
        })
        .catch(error => {
            // Display error message
            feedbackMessage.style.display = 'block';
            feedbackMessage.textContent = 'Error sending feedback. Please try again.';
            feedbackMessage.style.color = 'red';
            console.error('Error!', error.message);
        });
    });
   /*----------------------------*/

    // Close form when clicking outside of it
    feedbackOverlay.addEventListener('click', function(event) {
        if (feedbackForm && !feedbackForm.contains(event.target) && !sendBtn.contains(event.target)) {
            feedbackOverlay.style.display = 'none';
        }
    });

    /*---------------------------mp4 media player overlay -------------------------*/ 
    /*
    function createMediaPlayer(link) {
        const overlay = document.createElement('div');
        overlay.classList.add('media-overlay');
        const videoPlayer = document.createElement('div');
        videoPlayer.classList.add('video-player');
        const closeBtn = document.createElement('span');
        closeBtn.classList.add('close-btn');
        closeBtn.textContent = '×';
        closeBtn.addEventListener('click', function() {
            document.body.removeChild(overlay);
        });

        const iframe = document.createElement('iframe');
        iframe.src = link;
        iframe.width = '640';
        iframe.height = '360';
        iframe.allow = 'autoplay';

        videoPlayer.appendChild(closeBtn);
        videoPlayer.appendChild(iframe);
        overlay.appendChild(videoPlayer);
        document.body.appendChild(overlay);
    }

    movieList.addEventListener('click', function(event) {
        const target = event.target.closest('.movie-card a');
        if (target) {
            event.preventDefault();
            const link = target.href.replace('/view', '/preview');
            createMediaPlayer(link);
        }
    });
    */
});

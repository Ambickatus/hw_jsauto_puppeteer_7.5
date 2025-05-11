Feature: Search a course
    Scenario: Should successfully book the ticket to "Witcher" in common hall
        Given user is on "https://qamid.tmweb.ru/client/index.php" page
        When user book tickets for choosen date "a:nth-child(2)" and hall ".movie-seances__time[href='#'][data-seance-id='225']"
        Then user sees the qr code and title "ИдёмВКино"

    Scenario: Should successfully book the ticket to "Mickie-Maus" in beautiful hall
        Given user is on "https://qamid.tmweb.ru/client/index.php" page
        When user book tickets for Mickie-Maus choosen date "a:nth-child(3)" and hall ".movie-seances__time[href='#'][data-seance-id='199']"
        Then user sees the qr code and title "ИдёмВКино"

    Scenario: Should NOT able to click to the "Забронировать" button, if doesn't chose sitting site
        Given user is on "https://qamid.tmweb.ru/client/index.php" page
        When user chose date "a:nth-child(2)", hall ".movie-seances__time[href='#'][data-seance-id='225']" and doesn't chose sitting site
        Then user can't click to the 'Забронировать' button
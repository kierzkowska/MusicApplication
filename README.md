# MusicApplication

Strona serwera Aplikacji

Za konfigurację serwera odpowiadał głównie plik index.js. W danym pliku 
zaimplementowane zostały wszystkie niezbędne do uruchomienia aplikacji moduły. 
Pierwszym z nich był pakiet Express.js, który, aby prawidłowo zainstalować, wymagał 
poprzedzającego go zainstalowania pakietu Node.js oraz menadżera pakietów NPM [25].
Natomiast sam express w danej pracy jest funkcją, którą kolejno możemy uruchomić, aby 
skonstruować serwer. Należało utworzyć zmienną PORT, która przechowa adres 
tworzonego serwera. Kolejno powiadomiono aplikację express, aby zajęła się 
nasłuchiwaniem na nadejście żądania na wskazanym porcie, dodatkowo informując nas 
o tym powiadomieniem w konsoli. 
Następnym, równie ważnym elementem w pliku konfiguracyjnym było połączenie się 
serwera z bazą danych. Dodatkowo, należało również pobrać pakiet dotenv, który pozwolił nam załadować nasze zmienne środowiskowe 
przechowywane w pliku .env do proces.env. Dzięki temu zabiegowi uzyskaliśmy dostęp do 
określonych zmiennych w naszym kodzie (w opisanym niżej kodzie jest to zmienna 
mongoURI), co nałożyło się na pomyślne uruchomienie aplikacji zgodnie z wymaganiami 
środowiska. 
Natomiast aby użyć przekierowań, należało skorzystać z oprogramowania pośredniczącego.
Metoda app.use() umożliwia nam uruchomienie odpowiedniej funkcji dla pojedynczej 
ścieżki. Początkowo zezwoliliśmy na analizę plików JSON, ponieważ nasz serwer 
otrzymuje i wysyła żądania w postaci JSON. Wykorzystaliśmy również narzędzie cors, aby 
umożliwić bezpieczną wymianę danych pomiędzy różnymi źródłami, czyli w tym wypadku, aby zezwolić stronie klienta korzystanie z warstwy serwera. Zaś kolejno ustawiliśmy ścieżki 
przekierowań.


Strona klienta - repozytorium MusicApp

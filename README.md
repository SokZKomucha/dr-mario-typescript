_README is in Polish. For English description, refer to repo's "About me"._

### Instrukcja obsługi

Projekt zrobiony, aczkolwiek jest kilka wymagań, które trzeba spełnić, by działał tak, jak powinien.

Najważniejsze, prędkość gry. Jako iż `requstAnimationFrame` generalnie działa jak chce, zalecam ustawienie odpowiedniej wartości w pliku `/configuration/config.ts`. Ustawienie wartości takiej samej jak częstotliwość odświeżania monitora zapewni rozgrywkę w "standardowej" prędkości, tj. klocek spada raz na sekundę.
<br>
Tu niestety dochodzimy do problemów. W przypadku, gdy ktoś ma dwa monitory, o różnych częstotliwościach odświeżania, np. 144Hz i 60Hz, trzeba wpisać częstotliwość odświeżania głównego monitora. Przekonałem się o tym sam - trzymając grę na tym wolniejszym (60Hz), `requestAnimationFrame` działał, jakby miał 144Hz.

Nie zalecam podmieniania tekstur, ze względu na to, że niektóre rzeczy modyfikowałem. Przykładowo, rozdzieliłem pliki `covid_{color}.png` na `covid_{color}_{frame}.png` - te, pierwotnie z jakiegoś powodu były gifami z rozszerzeniem png. Niestety, gifa na canvas nie wstawię, stąd też konieczność rozdzielenia.

Nie radzę niczego (poza ww. `config.ts`) modyfikować. Generalnie wszystko działa, ale, że tak powiem, trzyma się na słowo honoru. Miejscami można zauważyć absurdalne obejścia problemów, ale przynajmniej działa

<br>

### Punktacja

punktacja w osobnym pliku `ocena.txt` :3

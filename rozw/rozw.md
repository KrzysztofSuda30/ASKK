Pytania, które mogą się pojawić na zaliczeniu (egzaminie)

1 Utwórz plik z obrazem Dockerfile, w którym z hosta do kontenera kopiowany będzie folder code (zawiera np. jeden skrypt w języku Python 🐍) i zbuduj go:
uruchom ww. skrypt wewnątrz kontenera.

docker build -t python-script .

docker run --rm python-script

2 Skopiuj wybrany plik tekstowy z hosta (swojego komputera) do kontenera Dockerowego.

docker build -t text-file-example .

docker run --rm text-file-example

3 Skopiuj wybrany plik tekstowy z kontenera Dockerowego do hosta (swojego komputera).

ze ścieżki do zadania2:

docker build -t text-file-example .

docker run -d --name text-file-container text-file-example

docker cp text-file-container:/app/tekst.txt C:\Users\Asus\Desktop\zadania\ASKK\rozw\zadanie3\kopia.txt

4 Pokaż działanie komend ENTRYPOINT i CMD w wybranym projekcie.

CMD: Ustawia domyślne polecenie lub argumenty do wykonania. Można je nadpisać w czasie uruchamiania kontenera.

ENTRYPOINT: Ustawia polecenie, które zawsze jest wykonywane, a argumenty można przekazać w czasie uruchamiania kontenera.

dla cmd pliki z zad 2:

docker build -t text-file-example .

docker run --rm text-file-example

docker run --rm text-file-example echo "tak"

dla enrtypoint z zadania4:

docker build -t entrypoint .

docker run --rm entrypoint

5 Pokaż działanie usługi bazodanowej z wykorzystaniem docker-compose.

docker-compose up -d

docker exec -it postgres_db psql -U user -d my_database

SELECT * FROM users;

6 Pokaż działanie komend ADD i COPY i WORKDIR w wybranym projekcie.

WORKDIR /app:

Ustawia katalog roboczy w kontenerze na /app.

Wszystkie kolejne operacje (COPY, ADD, CMD) będą wykonywane w tym katalogu, chyba że podano pełną ścieżkę.

COPY:

Kopiuje plik lub folder z systemu hosta do obrazu Dockera.

Używane wyłącznie do lokalnych plików.

ADD:

Może być używane jak COPY, ale obsługuje dodatkowe funkcje:

Automatyczne rozpakowywanie archiwów (.zip, itp.).

Pobieranie plików z URL.

docker build -t demo .

docker run --rm demo

7 Pokaż działanie docker compose w swoim projekcie.

docker-compose up -d

docker-compose ps

localhost:5000

8 Omów na podstawie swojej aplikacji komendy docker inspect i docker logs.

Komenda docker logs pozwala na odczytanie logów kontenera. Możesz dzięki niej sprawdzić, co aplikacja wypisuje na standardowe wyjście lub błąd

Komenda docker inspect pozwala na uzyskanie szczegółowych informacji o kontenerze lub obrazie. Wyświetla dane w formacie JSON, takie jak:

Identyfikator kontenera,
Zmienione środowiskowe,
Sieć,
Mapa portów,
Ścieżki wolumenów.

użycie na działającym projekcie z 7

docker inspect flask_app

docker logs flask_app

9 Czym są sieci w Dockerze? Zaprezentuj przykład na bazie swojego projektu.

Sieci w Dockerze służą do zarządzania komunikacją między kontenerami oraz między kontenerami a światem zewnętrznym. Docker oferuje różne typy sieci, które można dostosować do potrzeb aplikacji:

Bridge (most) - Domyślny typ sieci dla kontenerów. Kontenery podłączone do tej samej sieci bridge mogą się ze sobą komunikować.
Host - Używa sieci hosta maszyny, co oznacza, że kontener współdzieli adres IP z hostem.
None - Kontener nie ma dostępu do sieci.
Custom Network - Użytkownik może stworzyć własną sieć, określając jej konfigurację.

docker-compose up --build

docker-compose down

docker volume rm zadanie9_pg_data

docker-compose up --build

localhost3000

10 Jaka jest różnica między obrazem i kontenerem? Pokaż przykład budowania obrazu (Dockerfile) i uruchamiania na jego podstawie kontenera.

Obraz (Image): Jest to szablon, z którego tworzony jest kontener. Obraz zawiera wszystkie niezbędne pliki i konfiguracje, które pozwalają na uruchomienie aplikacji lub środowiska. Obraz jest niemutowalny i może być używany do tworzenia wielu kontenerów. Obraz to po prostu zapisany stan systemu plików.

Kontener (Container): Jest to uruchomiona instancja obrazu. Kontener to aktywne środowisko, które może działać, przyjmować dane wejściowe, wykonywać aplikacje i przechowywać dane. Kontener jest jednorazowy (choć można go ponownie uruchomić), a jego dane mogą być utracone po jego zatrzymaniu (chyba że używamy wolumenów).

do zademonstrowanie uśyłem aplikacji flask z zad12:

docker build -t myflaskapp .

docker images

docker run -d -p 5000:5000 --name myflaskcontainer myflaskapp

docker ps

11 Pokaż jak "wejść" do wybranego kontenera.
Utwórz w nim plik tekstowy z dowolnymi danymi. Co zrobić, żeby po zamknięciu kontenera dane z pliku były dostępne po ponownym uruchomieniu kontenera?
Zademonstruj dowolny sposób.

docker run -it --name zad11 ubuntu /bin/bash

 echo "plik tekstowy" >/myfile.txt

 root@ba7d2638a1e8:/# cat /myfile.txt

  exit

  docker volume create mydata

  docker rm zad11

  docker run -it --name zad11 -v mydata:/data ubuntu /bin/bash

   echo "zapisane" >/data/myfile.txt

  exit

  docker stop zad11

  docker start zad11

  docker exec -it zad11 /bin/bash

  cat /data/myfile.txt

12 Zbuduj wybrany przez siebie obraz, nadaj mu 'tag' i opublikuj na DockerHubie. Następnie usuń lokalnie ww. obraz i pobierz go z DockerHuba.

docker build -t krzysztofsuda/flask-app:latest .

docker push krzysztofsuda/flask-app:latest

docker rmi krzysztofsuda/flask-app:latest

docker pull krzysztofsuda/flask-app:latest

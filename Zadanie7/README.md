W tym zadaniu przeanalizuje plik docker compose pobrany z repozytorium: https://github.com/deviantony/docker-elk
Plik ten skopiowałem do tego folderu aby był on widoczny.

Plik definiuje cztery usługi: setup, elasticsearch, logstash i kibana. Usługi są zorganizowane w logiczną całość, umożliwiając szybkie wdrożenie stosu ELK. Dodatkowo wykorzystano sieci, wolumeny, zmienne środowiskowe oraz mechanizmy automatycznego restartu.

2. Szczegółowa analiza usług
2.1. Usługa setup
Cel:
Jednorazowa inicjalizacja użytkowników i ról w Elasticsearch.
Profil:
profiles:
  - setup
Użycie profilu setup pozwala na wykluczenie tej usługi z domyślnego uruchamiania.
Można ją uruchomić za pomocą:

docker compose --profile=setup up setup
Wolumeny:

volumes:
  - ./setup/entrypoint.sh:/entrypoint.sh:ro,Z
  - ./setup/lib.sh:/lib.sh:ro,Z
  - ./setup/roles:/roles:ro,Z
Pliki konfiguracyjne i skrypty są mapowane jako tylko do odczytu (ro), co zwiększa bezpieczeństwo.
Zmienne środowiskowe:

Przechowują hasła dla użytkowników Elastic Stack:

environment:
  ELASTIC_PASSWORD: ${ELASTIC_PASSWORD:-}
  LOGSTASH_INTERNAL_PASSWORD: ${LOGSTASH_INTERNAL_PASSWORD:-}
  KIBANA_SYSTEM_PASSWORD: ${KIBANA_SYSTEM_PASSWORD:-}
Zależności:

depends_on:
  - elasticsearch
Gwarantuje, że usługa elasticsearch zostanie uruchomiona przed setup.
2.2. Usługa elasticsearch
Cel:
Udostępnienie bazy danych wyszukiwania i przechowywania danych.

Wolumeny:

volumes:
  - ./elasticsearch/config/elasticsearch.yml:/usr/share/elasticsearch/config/elasticsearch.yml:ro,Z
  - elasticsearch:/usr/share/elasticsearch/data:Z
Pierwszy wolumen umożliwia dostosowaną konfigurację Elasticsearch.
Drugi wolumen przechowuje dane między restartami.
Porty:

ports:
  - 9200:9200
  - 9300:9300
Port 9200 umożliwia komunikację z Elasticsearch za pomocą HTTP.
Port 9300 jest używany do komunikacji w klastrze.
Zmienne środowiskowe:

environment:
  node.name: elasticsearch
  discovery.type: single-node
discovery.type: single-node — Wyłącza tryb produkcyjny, co upraszcza uruchamianie lokalne.
Mechanizm restartu:

restart: unless-stopped
Kontener będzie automatycznie restartowany, jeśli się zatrzyma, chyba że użytkownik wyłączy usługę.
2.3. Usługa logstash
Cel:
Przetwarzanie danych i wysyłanie ich do Elasticsearch.

Wolumeny:

volumes:
  - ./logstash/config/logstash.yml:/usr/share/logstash/config/logstash.yml:ro,Z
  - ./logstash/pipeline:/usr/share/logstash/pipeline:ro,Z
Konfiguracja Logstasha oraz potoki danych mogą być łatwo edytowane na hoście.
Porty:

ports:
  - 5044:5044
  - 50000:50000/tcp
  - 50000:50000/udp
  - 9600:9600
Port 5044 umożliwia odbiór danych z Beats.
Porty 50000 są używane dla protokołów TCP/UDP.
Port 9600 służy do monitorowania i zarządzania Logstashem.
Zmienne środowiskowe:

environment:
  LOGSTASH_INTERNAL_PASSWORD: ${LOGSTASH_INTERNAL_PASSWORD:-}
Hasło dla użytkownika Logstash.
Zależności:

depends_on:
  - elasticsearch
Zapewnia, że Elasticsearch będzie uruchomiony przed Logstashem.
2.4. Usługa kibana
Cel:
Wizualizacja danych za pomocą interfejsu webowego.

Wolumeny:

volumes:
  - ./kibana/config/kibana.yml:/usr/share/kibana/config/kibana.yml:ro,Z
Konfiguracja jest przechowywana lokalnie, co ułatwia jej dostosowanie.
Porty:

ports:
  - 5601:5601
Udostępnia interfejs Kibany na porcie 5601.
Zmienne środowiskowe:

environment:
  KIBANA_SYSTEM_PASSWORD: ${KIBANA_SYSTEM_PASSWORD:-}
Hasło dla użytkownika Kibana.
Zależności:

depends_on:
  - elasticsearch
Kibana wymaga, aby Elasticsearch był uruchomiony jako pierwszy.
3. Sieci
Definicja sieci:

networks:
  elk:
    driver: bridge
Wszystkie usługi są połączone w jednej sieci elk, co umożliwia ich wzajemną komunikację.
4. Wolumeny
Definicja wolumenów:
volumes:
  elasticsearch:
Wolumen elasticsearch przechowuje dane trwałe, co pozwala uniknąć ich utraty przy restarcie kontenerów.
5. Mechanizmy inicjalizacyjne
Skrypt entrypoint.sh w usłudze setup wykonuje jednorazowe zadania, takie jak:
Tworzenie użytkowników.
Ustawianie haseł.
Definiowanie ról.
6. Podsumowanie
Plik docker-compose.yml jest dobrze zaprojektowany i pozwala na łatwe zarządzanie usługami ELK. Kluczowe zalety:
Jasna separacja ról poszczególnych usług.
Wykorzystanie wolumenów dla trwałości danych.
Mechanizmy inicjalizacyjne ułatwiają konfigurację.
Sieci pozwalają na efektywną komunikację między usługami.



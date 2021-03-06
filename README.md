# Timer++

Timer com funcionalidades extras feito com [React Native](https://reactnative.dev/).

## Features

### Cronometro e Timer

- Cronômetro normal
- Timer/Temporizador
- Countdown/Contagem Regressiva

### Alertas

Defina alertas ou lembretes com intervalo (em segundos) para marcar suas atividades.

Crie sequências e rotinas em poucos passos. Ideal para marcar treinos com exercícios intervalados (por exemplo: HIIT), controle de tempo em refeições e tarefas repetitivas. O smartphone vibra quando um alerta é ativado. Opcionalmente, pode-se gravar um audio para tocar quando o respectivo alerta é ativado [TODO].

Também inclui:

- Marcador de voltas
- Histórico de lembretes
- Criar e salvar rotinas para usar quando quiser [TODO]

## Exemplo de uso

Criando uma rotina para fazer um exercício por 20 segundos e depois descansar por 10 segundos:

1. Adicione o alerta do exercício: Em Intervalo, escolha os segundos (20);
2. Adicione a mensagem do alerta: Em Mensagem, digite uma mensagem, por exemplo: "FLEXÕES!";
3. Toque em Adicionar;
4. Repita os passos 1, 2 e 3, para adicionar 10 segundos de descanso, com a mensagem "DESCANSAR!".
5. Pronto! Aperte o Play e treine.

É importante adicionar os alertas na sequência desejada. Você pode definir um tempo máximo para executar a rotina ou alternar para um timer regressivo.

## Requisitos

- [Node 12 LTS](https://nodejs.org/en/);
- [yarn](https://classic.yarnpkg.com/en/);
- VSCode com plugin eslint e prettier (opcional);

## Rodando o projeto

- Clone o repositório
- Abra o terminal dentro da pasta do repo e rode `yarn` para instalar as depêndencias
- Rode `yarn android` para iniciar o Timer++ em um emulador ou dispositivo android, se tiver. E `yarn ios` para iniciar em um dispositivo iOS.

## Limitações

- Por enquanto o Timer++ não roda em background, isto é, o contador pausa quando o app é minimizado.
- O intervalo do alerta é em segundos, em breve será possivel escolher o intervalo em qualquer medida.

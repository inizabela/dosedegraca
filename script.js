var quotes = [{
  author: "(Gn 12:1-3)",
  quote: "Então o Senhor disse a Abrão: “Saia da sua terra, do meio dos seus parentes e da casa de seu pai, e vá para a terra que eu lhe mostrarei. “Farei de você um grande povo, e o abençoarei. Tornarei famoso o seu nome, e você será uma bênção. Abençoarei os que o abençoarem e amaldiçoarei os que o amaldiçoarem; e por meio de você todos os povos da terra serão abençoados”."
}, {
  author: "(Gn 22:18)",
  quote: "E, por meio dela, todos os povos da terra serão abençoados, porque você me obedeceu."
}, {
  author: "(Ex 23:25)",
  quote: "Prestem culto ao Senhor, o Deus de vocês, e ele os abençoará, dando-lhes alimento e água. Tirarei a doença do meio de vocês"
}, {
  author: "(Dt 28:8)",
  quote: "O Senhor enviará bênçãos aos seus celeiros e a tudo o que as suas mãos fizerem. O Senhor, o seu Deus, os abençoará na terra que lhes dá."
}];

var requestButton = document.querySelector("#requestButton"),
  skip_animation_button = document.querySelector("#skipAnimationButton"),
  quote_line = document.querySelector("#quote"),
  author_line = document.querySelector("#author"),
  typing_sound = new Audio("https://s3.amazonaws.com/codepen-files/typing.wav"),
  chosen_quote_object,
  running = 0,
  interval,
  index = 0;

Array.prototype.compare = function(test_array) {
  for (var i = 0; i < this.length; i++) {
    if (test_array.indexOf(this[i]) == -1)
      return false;
  }
  return true;
};

typing_sound.addEventListener("ended", function() {
  this.currentTime = 0;
  this.play();
});

requestButton.addEventListener("click", function() {
  if (running === 0) {
    quote_line.innerHTML = "";
    author_line.innerHTML = "";
    write_quote();
  }
});

skip_animation_button.addEventListener("click", function() {
  typing_sound.pause();
  typing_sound.currentTime = 0;
  running = 0;
  index = 0;
  window.clearInterval(interval);
  quote_line.innerHTML = chosen_quote_object.quote;
  author_line.innerHTML = chosen_quote_object.author;
});

function type_out(letter, text, line) {
  letter = index;
  if (letter == text.length) {
    if (text.compare(chosen_quote_object.quote.split(''))) {
      index = 0;
      clearInterval(interval);
      interval = setInterval(type_out, 85, index, chosen_quote_object.author.split(''), author_line);
      return;
    }
    index = 0;
    typing_sound.pause();
    clearInterval(interval);
    running = 0;
    return;
  }
  line.innerHTML += text[letter];
  index++;
}

function write_quote() {
  typing_sound.play();
  running = 1;
  var q = quotes[Math.floor(Math.random() * quotes.length)],
    author = q.author.split(''),
    quote = q.quote.split('');
  chosen_quote_object = q;
  interval = setInterval(type_out, 85, index, chosen_quote_object.quote.split(''), quote_line);
}

write_quote();
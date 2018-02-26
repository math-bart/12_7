// KLASA KANBAN CARD
function Card(id, name) {
	var self = this;
	this.id = id;
	this.name = name || 'No name given';
	this.element = createCard();

	function createCard() {
		var card = $('<li class="card"></li>');
		var cardChangeName = $('<button class="card-change">Zmień nazwę</button>'); //mój
		var cardDeleteBtn = $('<button class="btn-delete">x</button>');
		var cardDescription = $('<p class="card-description"></p>');
		
		cardDeleteBtn.click(function(){
			self.removeCard();
		});
		
		cardChangeName.click(function(event) {
			var cardName = prompt('Enter new name of the card');
			event.preventDefault();
			$.ajax({
				url: baseUrl + '/card/' + self.id,
				method: 'PUT',
				data: {
					name: cardName,
				},
				success: function(response) {	
					self.element.children('p').html(columnName);
				}
			});
		});
		
		card.append(cardChangeName);
		card.append(cardDeleteBtn);
		cardDescription.text(self.name);
		card.append(cardDescription)
		return card;
	}
}
Card.prototype = {
	removeCard: function() {
		var self = this;
		$.ajax({
			url: baseUrl + '/card/' + self.id,
			method: 'DELETE',
			success: function(){
				self.element.remove();
			}
		});
	}
}
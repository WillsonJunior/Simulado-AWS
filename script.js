// script.js

// Função para calcular a pontuação e mostrar os resultados
function calculateScore() {
    // Respostas corretas
    const correctAnswers = {
        q1: 'C',
        q2: 'B',
        q3: 'B',
        q4: 'C',
        q5: 'C',
        q6: 'C',
        q7: 'C',
        q8: 'D',
        q9: 'A',
        q10: 'B',
        q11: 'A',
        q12: 'A',
        q13: 'B',
        q14: 'A',
        q15: 'A',
        q16: 'A',
        q17: 'A',
        q18: 'D',
        q19: 'A',
        q20: 'A'
    };

    let score = 0;
    const totalQuestions = Object.keys(correctAnswers).length;
    let incorrectAnswers = [];

    // Obtém todas as respostas selecionadas
    for (let i = 1; i <= totalQuestions; i++) {
        const selectedAnswer = document.querySelector(`input[name=q${i}]:checked`);

        if (selectedAnswer) {
            const questionId = `q${i}`;
            const selectedValue = selectedAnswer.value;

            if (selectedValue === correctAnswers[questionId]) {
                score++;
            } else {
                incorrectAnswers.push({ question: questionId, selected: selectedValue });
            }
        } else {
            incorrectAnswers.push({ question: `q${i}`, selected: 'Nenhuma resposta' });
        }
    }

    // Exibe os resultados
    document.getElementById('scoreText').innerText = `Sua pontuação: ${score} de ${totalQuestions}`;
    displayIncorrectAnswers(incorrectAnswers);
    displayResultChart(score, totalQuestions);

    // Mostra a seção de resultados
    document.getElementById('resultSection').style.display = 'block';
}

// Função para exibir as respostas incorretas
function displayIncorrectAnswers(incorrectAnswers) {
    const incorrectAnswersDiv = document.getElementById('incorrectAnswers');
    incorrectAnswersDiv.innerHTML = '<h3>Respostas Incorretas</h3>';

    if (incorrectAnswers.length === 0) {
        incorrectAnswersDiv.innerHTML += '<p>Você acertou todas as questões!</p>';
    } else {
        incorrectAnswers.forEach(answer => {
            incorrectAnswersDiv.innerHTML += `<p>Questão ${answer.question}: Resposta selecionada - ${answer.selected}</p>`;
        });
    }
}

// Função para exibir o gráfico de resultados em formato de pizza
function displayResultChart(score, totalQuestions) {
    const ctx = document.getElementById('resultChart').getContext('2d');

    new Chart(ctx, {
        type: 'pie',
        data: {
            labels: ['Corretas', 'Incorretas'],
            datasets: [{
                data: [score, totalQuestions - score],
                backgroundColor: ['#4caf50', '#f44336']
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    display: true,
                    position: 'top'
                },
                tooltip: {
                    callbacks: {
                        label: function(tooltipItem) {
                            return `${tooltipItem.label}: ${tooltipItem.raw}`;
                        }
                    }
                }
            }
        }
    });
}

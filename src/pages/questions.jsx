import { useState, useEffect } from "react";
import { supabaseTeach } from "../../supabase";

function FlashcardPage() {
    const [cards, setCards] = useState([]);
    const [currentCardIndex, setCurrentCardIndex] = useState(0);
    const [showAnswer, setShowAnswer] = useState(false);
    const [selectedChoice, setSelectedChoice] = useState(null);
    const [choice, setChoice] = useState([])
    const [userAnswer, setUserAnswer] = useState(null)

    // Fetch cards when component mounts
    const fetchCards = async () => {
        try {
            const { data, error } = await supabaseTeach
                .from('q_multi_choice')
                .select('*');
            setCards(data)

            if (error) {
                console.error("Error fetching cards:", error);
            } else {
                // Parse the choices and answer for each card
                const parsedCards = data.map(card => ({
                    ...card,
                    choices: card.choices,
                    correctAnswer: card.answer
                }));
                setCards(parsedCards);

            }
        } catch (error) {
            console.error("Error fetching cards:", error);
        }
    };

    useEffect(() => {
        fetchCards();
        // setChoice(JSON.parse(cards[currentCardIndex]?.choice))
    }, []);

    const handleChoiceSelected = (choiceKey) => {
        const userAnswer = Object.values(cards[currentCardIndex].choices)[Number(choiceKey)];
        setSelectedChoice(userAnswer);

        // Show the answer after a short delay
        setTimeout(() => {
            setShowAnswer(true);
        }, 1000);

        // Move to next question after showing the answer
        setTimeout(() => {
            handleNextCard();
        }, 2000);
    };

    const handleNextCard = () => {
        setUserAnswer(null)
        setShowAnswer(false)
        setSelectedChoice(null);
        //setShowAnswer(false);
        setCurrentCardIndex((prev) => (prev + 1) % cards.length);
    };

    const renderChoices = () => {
        const choices = cards[currentCardIndex]?.choices || {};
        return Object.entries(choices).map(([key, value]) => (
            <button
                key={key}
                onClick={() => handleChoiceSelected(key)}
                style={{
                    padding: '10px 20px',
                    margin: '5px',
                    fontSize: '16px',
                    backgroundColor: '#f0f0f0',
                    border: 'none',
                    borderRadius: '5px',
                    cursor: 'pointer',
                    arently: selectedChoice ? (value === JSON.parse(cards[currentCardIndex].answer) ? 'rgb(0, 255, 0)' : 'rgb(255, 0, 0)') : null,
                }}
            >
                {value}
            </button>
        ));
    };
    console.log()
    return (
        <div className="container" style={{ textAlign: 'center', marginTop: '100px' }}>
            <h1>Medical Flashcards</h1>

            {cards.length > 0 ? (
                <div>
                    <div
                        style={{
                            padding: '20px',
                            border: '1px solid #ddd',
                            borderRadius: '8px',
                            marginBottom: '20px'
                        }}
                    >
                        <h3 style={{ textAlign: 'center', marginBottom: '20px' }}>
                            {cards[currentCardIndex]?.question}
                        </h3>
                        <p style={{
                            fontSize: '16px',
                            fontWeight: 'bold',
                            color: '#666',
                            marginTop: '10px'
                        }}>
                            {cards[currentCardIndex]?.choice}
                        </p>

                        {!showAnswer ? (
                            <div style={{ marginBottom: '20px' }}>
                                <input maxLength={1} value={userAnswer} onChange={(e) => setUserAnswer(e.target.value)} />
                            </div>
                        ) : (
                            <div>

                                <p style={{ fontSize: '18px', fontWeight: 'bold', color: '#333' }}>
                                    Explanation: {cards[currentCardIndex]?.explanation}
                                </p>
                                <p style={{
                                    fontSize: '16px',
                                    fontWeight: 'bold',
                                    color: userAnswer.toLowerCase() !== cards[currentCardIndex]?.answer.toLowerCase() ? 'red' : 'green',
                                    marginTop: '10px'

                                }}>
                                    Your Answer : {userAnswer}

                                </p>
                                <p style={{
                                    fontSize: '16px',
                                    fontWeight: 'bold',
                                    color: '#666',
                                    marginTop: '10px'
                                }}>

                                    Correct Answer: {cards[currentCardIndex]?.answer}
                                </p>
                                <p>{userAnswer.toLowerCase() !== cards[currentCardIndex]?.answer.toLowerCase() ? "Incorrect" : "Correct"}</p>
                            </div>
                        )}
                    </div>
                    <button
                        onClick={() => setShowAnswer(true)}
                        style={{
                            padding: '10px 20px',
                            fontSize: '16px',
                            backgroundColor: '#4CAF50',
                            color: 'white',
                            border: 'none',
                            borderRadius: '5px',
                            cursor: 'pointer'
                        }}
                    >
                        show answer
                    </button>

                    <button
                        onClick={handleNextCard}
                        style={{
                            padding: '10px 20px',
                            fontSize: '16px',
                            backgroundColor: '#4CAF50',
                            color: 'white',
                            border: 'none',
                            borderRadius: '5px',
                            cursor: 'pointer'
                        }}
                    >
                        Next Question
                    </button>
                </div>
            ) : (
                <p>Loading cards...</p>
            )}
        </div>
    );
}

export default FlashcardPage;

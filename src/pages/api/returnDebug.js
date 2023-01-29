const generateCode = async ({
  debug
}) => {
  try {
    const response = await fetch(
      "https://api.openai.com/v1/engines/text-davinci-003/completions",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        },
        body: JSON.stringify({
          prompt: `Try to Debug this code: ${debug}. If errors are found, return a full overview of the functions and any libraries included, and the language identified.`,
          max_tokens: 300,
          temperature: 0.5,
        }),
      }
    );
    const data = await response.json();

    return data.choices[0].text;
  } catch (err) {
    console.error(err);
  }
};

export default async function handler(req, res) {
  const { debug } = req.body;

  const answer = await generateCode({
    debug
  });

  res.status(200).json({
    answer,
  });
}

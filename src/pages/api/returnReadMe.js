const generateReadMe = async ({
  code
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
          prompt: `${code}. Read the code and generate a README.md for it in markdown format. Make sure all sentences are complete.`,
          max_tokens: 300,
          temperature: 0.5,
        }),
      }
    );
    const data = await response.json();

    return data?.choices[0]?.text;
  } catch (err) {
    console.error(err);
    return err.toString()
  }
};

export default async function handler(req, res) {
  const { code } = req.body;
  console.log('Code for readme: ', code)
  const answer = await generateReadMe({
    code
  });

  res.status(200).json({
    answer,
  });
}

import postcss from 'npm:postcss'
import tailwind from 'npm:tailwindcss'
// import resolveConfig from 'npm:tailwindcss/resolveConfig'
import twconfig from './tailwind.config.ts'
import foo from './foo.ts'

(async () => {
  const result = await postcss([
    tailwind({
      ...(twconfig),
      content: ['./test.html'],
      safelist: [
        {
          pattern: /.*/,
        },
      ],
    }),
  ]).process(`
@tailwind base;
@tailwind components;
@tailwind utilities;
  `)

  const res = (await postcss([foo()]).process(result.css)).messages
  console.log(res.filter(r => r.plugin === 'foo')[0])
})()

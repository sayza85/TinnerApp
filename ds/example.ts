function bar(args: Number[]) {
    let text = ''
    for (let i = 0; i < args.length; i++) {
        const element = args[i]
        text += element
        for (let j = 0; j < i; i++) {
            text += `j`
        }
    }
    console.log(text)

}


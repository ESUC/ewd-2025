import clipboard
while True: 
    text = input('Paste a link:')
    clipboard.copy("<a href=\"{}\">{}</a>".format(text, text))

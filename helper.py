import clipboard, re

text = clipboard.paste()  # text will have the content of clipboard
text = re.sub("^\s*$", "<p></p>", text)
text = re.sub("\r\n", "<br>", text)
text = re.sub("<br><br>", "<p class=\"p-text-break\"></p>", text)
# text = re.sub("<br><p>", "<p>", text)
# text = re.sub("</p><br>", "</p>", text)
clipboard.copy(text)

# "<a href=\"{}\">{}</a>".format(text, text)
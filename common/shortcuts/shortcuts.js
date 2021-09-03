const ShortcutInfo = plus.android.importClass("android.content.pm.ShortcutInfo");
const Context = plus.android.importClass("android.content.Context");
const Build = plus.android.importClass("android.os.Build");

function addShortcuts(main, shortcuts) {
	if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.N_MR1) {
		const shortcutManager = main.getSystemService(Context.SHORTCUT_SERVICE);

		try {
			const shortcutInfoList = plus.android.newObject('java.util.ArrayList');
			shortcuts.forEach((item) => {
				const intent = plus.android.newObject('android.content.Intent', 'io.dcloud.PandoraEntry');
				plus.android.invoke(intent, 'setClassName', main, "io.dcloud.PandoraEntryActivity");
				plus.android.invoke(intent, 'setFlags', plus.android.getAttribute(intent, 'FLAG_ACTIVITY_NEW_TASK'));
				plus.android.invoke(intent, 'putExtra', 'path', item.path);

				const shortcut = new ShortcutInfo.Builder(main, item.id);
				const icon = plus.android.invoke("android.graphics.drawable.Icon", 'createWithFilePath', item.icon);
				shortcut.setShortLabel(item.shortLabel || item.title);
				shortcut.setLongLabel(item.title);
				shortcut.setIntent(intent);
				shortcut.setIcon(icon);
				let build = shortcut.build();

				plus.android.invoke(shortcutInfoList, 'add', build);
			})
			return plus.android.invoke(shortcutManager, 'setDynamicShortcuts', shortcutInfoList);
		} catch (e) {
			console.log(e);
			return false;
		}
	}
	return false;
}

function removeAll(main) {
	if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.N_MR1) {
		const shortcutManager = main.getSystemService(Context.SHORTCUT_SERVICE);
		return plus.android.invoke(shortcutManager, 'removeAllDynamicShortcuts');
	}
}

export { addShortcuts, removeAll };

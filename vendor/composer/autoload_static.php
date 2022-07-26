<?php

// autoload_static.php @generated by Composer

namespace Composer\Autoload;

class ComposerStaticInit23a419ac0889fc91642fc4b0667b3f3d
{
    public static $classMap = array (
        'Composer\\InstalledVersions' => __DIR__ . '/..' . '/composer/InstalledVersions.php',
        'PHPGangsta_GoogleAuthenticator' => __DIR__ . '/..' . '/phpgangsta/googleauthenticator/PHPGangsta/GoogleAuthenticator.php',
    );

    public static function getInitializer(ClassLoader $loader)
    {
        return \Closure::bind(function () use ($loader) {
            $loader->classMap = ComposerStaticInit23a419ac0889fc91642fc4b0667b3f3d::$classMap;

        }, null, ClassLoader::class);
    }
}
